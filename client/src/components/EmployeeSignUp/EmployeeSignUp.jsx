import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import PropTypes from "prop-types";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const jobs = ["Site Tester", "Lab Tech"];

export default function EmployeeSignUp(props) {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="Phone No."
          name="phoneNum"
          variant="outlined"
          required
          fullWidth
          id="Phone No."
          label="Phone No."
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          multiple
          options={jobs}
          onChange={(event, value) => props.setJobTypes(value)}
          disableCloseOnSelect
          getOptionLabel={(option) => option}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option}
            </>
          )}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              variant="outlined"
              fullWidth
              required
              label="Employee Type"
            />
          )}
        />
      </Grid>
    </>
  );
}

EmployeeSignUp.propTypes = {
  setJobTypes: PropTypes.func.isRequired,
};
