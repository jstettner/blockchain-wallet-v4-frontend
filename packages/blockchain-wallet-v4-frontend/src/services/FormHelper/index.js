import React from 'react'
import bip39 from 'bip39'
import {
  isNumeric,
  isEmail,
  isDOB,
  isGuid,
  isUsZipcode,
  isIpList,
  isAlphaNumeric,
  formatSSN,
  formatDOB,
  formatUSZipcode,
  isOverEighteen,
  isSSN,
  formatPhone
} from './../ValidationHelper'
import { isValidIBAN, isValidBIC } from 'ibantools'
import { isValidNumber } from 'libphonenumber-js'
import zxcvbn from 'zxcvbn'
import { utils } from 'blockchain-wallet-v4/src'
import * as M from './validationMessages'
import { concat, path, takeWhile, prop } from 'ramda'

const required = value => (value ? undefined : <M.RequiredMessage />)

const optional = validator => value =>
  value === undefined || value === '' ? undefined : validator(value)

const validNumber = value =>
  isNumeric(value) ? undefined : <M.InvalidNumberMessage />

const requiredNumber = value =>
  isNumeric(value) && value > 0 ? undefined : <M.RequiredNumberMessage />

const validEmail = value =>
  isEmail(value) ? undefined : <M.InvalidEmailMessage />

const validMnemonic = value =>
  bip39.validateMnemonic(value) ? undefined : <M.InvalidPassphraseMessage />

const validWalletId = value =>
  isGuid(value) ? undefined : <M.InvalidWalletIdMessage />

const validMobileNumber = value =>
  isValidNumber(value) ? undefined : <M.InvalidMobileNumberMessage />

const validStrongPassword = value =>
  value !== undefined && zxcvbn(value).score > 1 ? (
    undefined
  ) : (
    <M.InvalidStrongPasswordMessage />
  )

const validIpList = value =>
  isIpList(value) ? undefined : <M.InvalidIpListMessage />

const validPasswordConfirmation = passwordFieldName => (value, allValues) =>
  value === allValues[passwordFieldName] ? undefined : <M.PasswordsDoNotMatch />

const validCurrentPassword = (value, allValues, { currentWalletPassword }) =>
  value === currentWalletPassword ? undefined : <M.IncorrectPassword />

const isNotCurrentPassword = (value, allValues, { currentWalletPassword }) =>
  value !== currentWalletPassword ? undefined : <M.SamePasswordAsCurrent />

const validPasswordStretchingNumber = value =>
  value > 1 && value <= 20000 ? (
    undefined
  ) : (
    <M.InvalidPasswordStretchingNumberMessage />
  )

const validEtherAddress = value =>
  utils.ethereum.isValidAddress(value) ? (
    undefined
  ) : (
    <M.InvalidEtherAddressMessage />
  )

const validBitcoinAddress = value =>
  utils.bitcoin.isValidBitcoinAddress(value) ? (
    undefined
  ) : (
    <M.InvalidBitcoinAddressMessage />
  )

const validBitcoinCashAddress = value =>
  utils.bitcoin.isValidBitcoinAddress(value) || utils.bch.isCashAddr(value) ? (
    undefined
  ) : (
    <M.InvalidBitcoinCashAddressMessage />
  )

const validEmailCode = value =>
  isAlphaNumeric(value) ? undefined : <M.InvalidEmailCodeMessage />

const validBitcoinPrivateKey = value =>
  utils.bitcoin.isValidBitcoinPrivateKey(value) ? (
    undefined
  ) : (
    <M.InvalidBitcoinPrivateKeyMessage />
  )

const validIban = value => (isValidIBAN(value) ? undefined : 'Invalid IBAN')

const validBIC = value => (isValidBIC(value) ? undefined : 'Invalid BIC')

const normalizeSocialSecurity = (val, prevVal) => formatSSN(val, prevVal)

const normalizeDateOfBirth = (val, prevVal) => formatDOB(val, prevVal)

const normalizeUSZipcode = value => formatUSZipcode(value)

const ageOverEighteen = value =>
  isOverEighteen(value) ? undefined : <M.AgeOverEighteenMessage />

const requiredSSN = value =>
  isSSN(value) ? undefined : <M.RequiredSSNMessage />

const requiredDOB = value =>
  isDOB(value) ? undefined : <M.RequiredDOBMessage />

const requiredUsZipcode = value =>
  isUsZipcode(value) ? undefined : <M.RequiredUSZipCodeMessage />

const normalizePhone = (val, prevVal) => formatPhone(val, prevVal)

const onPartnerCountryWhitelist = (val, allVals, props, name, countries) => {
  const country = val && takeWhile(x => x !== '-', val)
  const options = path(['options', 'platforms', 'web'], props)
  const sfoxCountries = path(['sfox', 'countries'], options)
  const coinifyCountries = path(['coinify', 'countries'], options)
  const allCountries = countries || concat(sfoxCountries, coinifyCountries)
  return country && allCountries.includes(country) ? (
    undefined
  ) : (
    <M.PartnerCountryWhitelist />
  )
}

const onPartnerStateWhitelist = (val, allVals, props, name, states) => {
  const usState = prop('code', val)
  const options = path(['options', 'platforms', 'web'], props)
  const sfoxStates = path(['sfox', 'states'], options)
  return usState && sfoxStates.includes(usState) ? (
    undefined
  ) : (
    <M.PartnerStateWhitelist />
  )
}

export {
  required,
  requiredDOB,
  normalizePhone,
  onPartnerCountryWhitelist,
  onPartnerStateWhitelist,
  optional,
  requiredNumber,
  requiredSSN,
  requiredUsZipcode,
  validNumber,
  validEmail,
  validEmailCode,
  validMnemonic,
  validWalletId,
  validMobileNumber,
  validStrongPassword,
  validIpList,
  validPasswordConfirmation,
  validCurrentPassword,
  isNotCurrentPassword,
  validPasswordStretchingNumber,
  validBitcoinAddress,
  validBitcoinCashAddress,
  validBitcoinPrivateKey,
  validEtherAddress,
  validIban,
  validBIC,
  normalizeSocialSecurity,
  normalizeDateOfBirth,
  normalizeUSZipcode,
  ageOverEighteen
}
