export const {
  CHANGE,
  EDIT,
  NAME,
  NEW,
  OLD,
  PASS,
  SAVE
} = {
  EDIT: 'edit',
  SAVE: 'save',
  NAME: 'name',
  PASS: 'password',
  CHANGE: 'change',
  NEW: 'new',
  OLD: 'old',
}

export const {
  CHANGE_PASS,
  EDIT_NAME,
  EDIT_PASS,
  NEW_PASS,
  OLD_PASS,
  SAVE_PASS,
} = {
  EDIT_NAME: `${EDIT} ${NAME}`,
  EDIT_PASS: `${EDIT} ${PASS}`,
  CHANGE_PASS: `${CHANGE} ${PASS}`,
  OLD_PASS: `${OLD} ${PASS}`,
  NEW_PASS: `${NEW} ${PASS}`,
  SAVE_PASS: `${SAVE} ${PASS}`,
};
