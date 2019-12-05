import React, { Component } from 'react'
import t from 'tcomb-form-native'
import inputTemplate from './templates/Input'
import TextAreaTemplate from './templates/TextArea'

export const ReviewRestaurantStruct = t.struct({
  title: t.String,
  review: t.String
})

export const ReviewRestaurantOptions = {
  fields: {
    title: {
      template: inputTemplate,
      config: {
        placeholder: 'Title of review',
        iconType: 'material-community',
        iconName: 'silverware'
      }
    },
    review: {
      template: TextAreaTemplate,
      config: {
        placeholder: 'Review',
        iconType: 'material-community',
        iconName: 'silverware'
      }
    }
  }
}