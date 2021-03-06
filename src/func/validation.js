export const required = value => value ? undefined : 'Обязательно';

export const requiredAddress = value => value && value.string && value.street && value.house ? undefined : 'Обязательно';

export const requiredSelect = value => value || (value === 0) ? undefined : 'Обязательно';

const maxLength = max => value => value && value.length > max ? `Максимум ${max} символа` : undefined;

export const maxLength3 = maxLength(3);
export const maxLength9 = maxLength(9);

export const number = value => value && isNaN(Number(value)) ? 'Должно быть число' : undefined;

export const phoneNumber = value => value && (value.indexOf('_') !== -1) ? 'Не заполнен' : undefined;

const minLength = min => value => value && value.length < min ? `Минимум ${min} символа` : undefined;

export const minLength3 = minLength(3);
export const minLength7 = minLength(7);

const length = length => value => value && value.length !== length ? `${length} символа` : undefined;

export const length2 = length(2);
export const length3 = length(3);
export const length5 = length(5);
export const length6 = length(6);
export const length7 = length(7);
export const length17 = length(17);

export const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Неверный формат email' : undefined;

export const name = value => value && !/^[\u0400-\u04FF\s]+$/.test(value) ? 'Неверный формат ФИО' : undefined;

export const cyrillicAndNumbers = value => value && !/^[\u0400-\u04FF\s\d]+$/.test(value) ? 'Неверный формат' : undefined;

export const latinAndNumbers = value => value && !/^[a-zA-Z\d]+$/.test(value) ? 'Неверный формат' : undefined;