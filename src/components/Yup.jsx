import * as Yup from 'yup';

export const requiredSchema = Yup.object({
    email: Yup.string()
        .email('Geçerli bir email adresi giriniz.')
        .required('Email zorunludur.'),
    password: Yup.string()
        .min(6, 'Şifre en az 6 karakter olmalıdır.')
        .required('Şifre zorunludur.'),
    permission: Yup.boolean().oneOf([true], 'Kullanıcı sözleşmesini okuyup onaylayınız.')
});