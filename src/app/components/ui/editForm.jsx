import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import api from "../../api";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { useHistory } from "react-router-dom";

const EditForm = ({ userId }) => {
    const [data, setData] = useState({});
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [load, setLoad] = useState(false);
    const history = useHistory();

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const transform = (data) => {
        return data.map((item) => ({
            color: item.color,
            label: item.name,
            value: item._id
        }));
    };

    useEffect(() => {
        if (data._id) setLoad(false);
    }, [data]);

    useEffect(() => {
        setLoad(true);
        api.users.getById(userId).then((userData) => {
            setData((prevData) => ({
                ...prevData,
                ...userData,
                profession: userData.profession._id,
                qualities: transform(userData.qualities)
            }));
        });
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
    }, []);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            const quality = qualities.find((q) => q.value === elem.value);
            if (quality) {
                qualitiesArray.push({
                    _id: quality.value,
                    name: quality.label,
                    color: quality.color
                });
            }
        }
        return qualitiesArray;
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен не корректно"
            }
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then(() => {
                history.goBack();
            });
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
    };

    if (!load && professions.length > 0) {
        return (
            <div className="container">
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        history.goBack();
                    }}
                >
                    Назад
                </button>

                <div className="row">
                    <div className="col-md-6 offset-md-3 p-4 shadow">
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                defaultOption="Choose..."
                                name="profession"
                                onChange={handleChange}
                                options={professions}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                value={data.qualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />

                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto "
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading...</h1>;
    }
};
EditForm.propTypes = {
    userId: PropTypes.string.isRequired
};

export default EditForm;
