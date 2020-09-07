import React from 'react';
import {connect} from "react-redux";
import {setPassportData} from "../../../redux/registration/driverPassportReducer";
import TextField from "../../Elements/TextField";
import {autofill, Field, formValueSelector, reduxForm} from "redux-form";
import DateField from "../../Elements/DateField";
import FileField from "../../Elements/FileField";
import {compose} from "redux";
import {length5, length6, length7, minLength3, number, required, requiredAddress} from "../../../func/validation";
import {passportDepartmentMask, passportNumberMask, passportSeriesMask} from "../../../func/mask";
import AddressField from "../../Elements/AddressField";

const DriverPassportForm = ({state, handleSubmit, setRegistrationEqualsAddress}) => {
    return (
        <form onSubmit={handleSubmit} className="registration__passport passport form-block">
            <h3 className="form-block__heading">Паспорт</h3>
            <div className="form-block__fields">
                <div className="form-block__fields-line passport__fields-line">
                    <TextField className="form-block__field" name="passport_name" placeholder="Иван Иван Иванов" validate={[required, minLength3]}/>
                    <DateField className="form-block__field" name="passport_birthday" placeholder="Дата рождения" validate={[required]}/>
                    <div className="form-block__field passport__number">
                        <TextField className="" name="passport_number" placeholder="№" normalize={passportNumberMask} validate={[required, length5]}/>
                        <TextField className="" name="passport_series" placeholder="0000000" normalize={passportSeriesMask} validate={[required, number, length6]}/>
                    </div>
                    <TextField className="form-block__field" name="passport_issued_by" validate={[required, minLength3]} placeholder="Кем выдан"/>
                </div>
                <div className="form-block__fields-line passport__fields-line">
                    <TextField className="form-block__field" name="passport_department" normalize={passportDepartmentMask} validate={[required, length7]} placeholder="Код подразденения"/>
                    <DateField className="form-block__field" name="passport_issued_date" validate={[required]} placeholder="Дата выдачи"/>
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
                </div>
            </div>
        </form>
    );
}

let mapStateToProps = (state) => ({
    state: {
        registration_equals_address: state.driverPassportReducer.registration_equals_address,
        passport_registration: formValueSelector('driver-passport')(state, 'passport_registration')
    },
    initialValues: {
        passport_name: state.driverPassportReducer.passport_name,
        passport_birthday: state.driverPassportReducer.passport_birthday,
        passport_number: state.driverPassportReducer.passport_number,
        passport_series: state.driverPassportReducer.passport_series,
        passport_issued_by: state.driverPassportReducer.passport_issued_by,
        passport_department: state.driverPassportReducer.passport_department,
        passport_issued_date: state.driverPassportReducer.passport_issued_date,
        passport_registration: state.driverPassportReducer.passport_registration,
        passport_address: state.driverPassportReducer.passport_address,
        passport_reversal_photo: state.driverPassportReducer.passport_reversal_photo,
        passport_registration_photo: state.driverPassportReducer.passport_registration_photo,
        registration_equals_address: state.driverPassportReducer.registration_equals_address
    }
});

export default compose(
    connect(mapStateToProps, {onSubmit: setPassportData, setRegistrationEqualsAddress: autofill}),
    reduxForm({form: 'driver-passport', enableReinitialize: false}))(DriverPassportForm);