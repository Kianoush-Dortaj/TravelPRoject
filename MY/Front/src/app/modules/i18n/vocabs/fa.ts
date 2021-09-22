import { Locale } from "../service/translation.service";

// USA
export const locale:Locale = {
  lang: 'en',
  data: {
    LOGIN: {
      USERNAME: 'Username',
      PASSWORD: 'Password',
      LOGIN: 'Login',
      CODE: 'Code',
      AUTHENTICATION: 'Authentication',
      SEND_CODE: 'Send Code',
      DIDENT_GET_CODE: 'didn\'t Get Code',
      ENTER_CONFIRM_CODE: 'Enter the Confirmation Code'
    },
    SHARED_VALIDATE: {
      REQIERD: ' Reqied Fill the {{value}}  ',
      EMAIL_REQIERD: 'Please Enter Valid Email for {{value}}',
      DROPDOWN_REQIERD: 'Reqied Select The {{value}}',
      NOT_MATCHED_FORM: 'Field {{first}} not Matched By {{second}}  '
    }
  }
}
