import React from 'react';
import {connect} from "react-redux";
import {autofill, Field, formValueSelector, reduxForm} from "redux-form";
import {compose} from "redux";
import FileField from "../../Elements/FileField";
import TextField from "../../Elements/TextField";
import DateField from "../../Elements/DateField";
import {length5, length6, minLength3, required, requiredAddress, requiredSelect, name, cyrillicAndNumbers} from "../../../func/validation";
import {submitDriverForm} from "../../../redux/registration/driversReducer";
import AddressField from "../../Elements/AddressField";
import SelectField from "../../Elements/SelectField";
import {passportNumberMask, passportSeriesMask} from "../../../func/mask";
import WebcamField from "../../Elements/WebcamField";
import MultiSelectField from "../../Elements/MultiSelectField";

const DriverForm = ({state, handleSubmit, setRegistrationEqualsAddress}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="registration__passport passport form-block">
                <h3 className="form-block__heading">Паспорт</h3>
                <div className="form-block__fields">
                    <div className="form-block__fields-line passport__fields-line">
                        <TextField className="form-block__field" name="passport_name" placeholder="ФИО" validate={[required, minLength3, name]}/>
                        <DateField className="form-block__field" name="passport_birthday" placeholder="Дата рождения" validate={[required]}/>
                        <div className="form-block__field passport__number">
                            <TextField className="" name="passport_number" normalize={passportNumberMask} placeholder="№" validate={[required, length5]}/>
                            <TextField className="" name="passport_series" normalize={passportSeriesMask} placeholder="000000" validate={[required, length6]}/>
                        </div>
                        <TextField className="form-block__field" name="passport_issued_by" placeholder="Кем выдан" validate={[required, minLength3, cyrillicAndNumbers]}/>
                    </div>
                    <div className="form-block__fields-line passport__fields-line">
                        <TextField className="form-block__field" name="passport_department" placeholder="Код подразденения" validate={[required]}/>
                        <DateField className="form-block__field" name="passport_issued_date" placeholder="Дата выдачи" validate={[required]}/>
                        <AddressField className="form-block__field" name="passport_registration" placeholder="Данные прописки" count={5} validate={[requiredAddress]}/>
                        <AddressField className="form-block__field input-wrap--check-inside" name="passport_address" placeholder="Адрес проживание" count={5} validate={[requiredAddress]}>
                            <label className="check-wrap">
                                <Field name="registration_equals_address" component={({input, meta}) =>
                                    <input type="checkbox" className="check-wrap__input" checked={input.value} name={input.name} onChange={e => {
                                        if (!input.value) setRegistrationEqualsAddress(meta.form, 'passport_address', state.passport_registration);
                                        input.onChange(!input.value);
                                    }}/>
                                }/>
                                <span className="check-wrap__mark"></span>
                            </label>
                        </AddressField>
                    </div>
                    <div className="form-block__fields-line passport__photo-line">
                        <FileField className="form-block__field" name="passport_reversal_photo" placeholder="Фото разворота" validate={[required]}/>
                        <FileField className="form-block__field" name="passport_registration_photo" placeholder="Фото прописки" validate={[required]}/>
                        <FileField className="form-block__field" name="passport_photo_control" placeholder="Фото контроль" validate={[required]}/>
                    </div>
                </div>
            </div>
            <WebcamField name="passport_photo_control" validate={[required]}/>
            <div className="registration__passport registration__passport--license passport passport--license form-block">
                <h3 className="form-block__heading">Водительское удостоверение</h3>
                <div className="form-block__fields">
                    <div className="form-block__fields-line passport__fields-line">
                        <TextField className="form-block__field" name="license_name" placeholder="ФИО" validate={[required, minLength3, name]}/>
                        <div className="form-block__field passport__number">
                            <TextField className="" name="license_number" normalize={passportNumberMask} placeholder="№" validate={[required, length5]}/>
                            <TextField className="" name="license_series" normalize={passportSeriesMask} placeholder="0000000" validate={[required]}/>
                        </div>
                        <DateField className="form-block__field" name="license_issue_date" placeholder="Дата выдачи" validate={[required]}/>
                        <DateField className="form-block__field" name="license_validity_date" placeholder="Срок действия" validate={[required]}/>
                    </div>
                    <div className="form-block__fields-line passport__fields-line">
                        <TextField className="form-block__field" name="license_issued_by" placeholder="Кем выдан" validate={[required, minLength3, cyrillicAndNumbers]}/>
                        <SelectField name="selected_license_country_id" placeholder="Страна" className="form-block__field" items={state.license_countries} validate={[requiredSelect]}/>
                        <MultiSelectField name="license_categories" placeholder="Категория" hidePlaceholder={true} className="form-block__field" validate={[requiredSelect]}/>
                        <label className="form-block__field passport__field--files">
                            <FileField className="form-block__field" name="license_photo_1" placeholder="Фото 1" validate={[required]}/>
                            <FileField className="form-block__field" name="license_photo_2" placeholder="Фото 2" validate={[required]}/>
                        </label>
                    </div>
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => ({
    state: {
        registration_equals_address: state.driversReducer.registration_equals_address,
        passport_registration: formValueSelector('driver-data-add')(state, 'passport_registration'),

        license_countries: state.driversReducer.license_countries
    },
    initialValues: {
        passport_name: state.driversReducer.passport_name,
        passport_birthday: state.driversReducer.passport_birthday,
        passport_number: state.driversReducer.passport_number,
        passport_series: state.driversReducer.passport_series,
        passport_issued_by: state.driversReducer.passport_issued_by,
        passport_department: state.driversReducer.passport_department,
        passport_issued_date: state.driversReducer.passport_issued_date,
        passport_registration: state.driversReducer.passport_registration,
        passport_address: state.driversReducer.passport_address,
        passport_reversal_photo: state.driversReducer.passport_reversal_photo,
        passport_registration_photo: state.driversReducer.passport_registration_photo,
        passport_photo_control: state.driversReducer.passport_photo_control,
        registration_equals_address: state.driversReducer.registration_equals_address,

        license_name: state.driversReducer.license_name,
        license_number: state.driversReducer.license_number,
        license_series: state.driversReducer.license_series,
        license_issue_date: state.driversReducer.license_issue_date,
        license_validity_date: state.driversReducer.license_validity_date,
        license_issued_by: state.driversReducer.license_issued_by,
        selected_license_country_id: state.driversReducer.selected_license_country_id,
        license_categories: state.driversReducer.license_categories,
        license_photo_1: state.driversReducer.license_photo_1,
        license_photo_2: state.driversReducer.license_photo_2,
    }
});

export default compose(
    connect(mapStateToProps, {onSubmit: submitDriverForm, setRegistrationEqualsAddress: autofill}),
    reduxForm({form: 'driver-data-add', enableReinitialize: false}))(DriverForm);