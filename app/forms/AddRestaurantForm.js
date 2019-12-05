import React from 'react'

import t from 'tcomb-form-native'

//templates
import inputTemplate from './templates/Input'
import { TextAreaTemplate } from './templates/TextArea'

export const AddRestaurantStruct = t.struct({
  name: t.String,
  city: t.String,
  address: t.String,
  description: t.String
})

export const AddRestaurantOptions = {
  fields: {
    name: {
        template: inputTemplate,
        config: {
          placeholder: 'Name of Restaurant',
          iconType: 'material-community',
          iconName: 'silverware'
        }
    },
    city: {
        template: inputTemplate,
        config: {
          placeholder: 'City of Restaurant',
          iconType: 'material-community',
          iconName: 'city'
        }
    },
    address: {
        template: inputTemplate,
        config: {
          placeholder: 'Address of Restaurant',
          iconType: 'material-community',
          iconName: 'map-marker'
        }
    },
    description: {
        template: TextAreaTemplate,
        config: {
          placeholder: 'Description of Restaurant'
        }
    }
  }
}