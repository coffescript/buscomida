import React from 'react'

import t from 'tcomb-form-native'
import formValidation from '../utils/Validation'

//templates
import inputTemplate from './templates/Input'


export const LoginStruct = t.struct({
    email: formValidation.email,
    password: formValidation.password
})

export const LoginOptions = {
    fields: {
        email: {
            template: inputTemplate,
            config: {
                placeholder: 'Write your email',
                iconType: 'material-community',
                iconName: 'at'
            }
        },
        password: {
            template: inputTemplate,
            config: {
                placeholder: 'Write a password',
                iconType: 'material-community',
                iconName: 'lock-outline',
                password: true,
                secureTextEntry: true
            }
        }
    }
}