import React from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const jobs = [
  { label: "Site Tester", value: "Site Tester" },
  { label: "Lab Tech", value: "Lab Tech" },
];

export default function EmployeeSignUp() {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          autoComplete="Phone No."
          name="Phone No."
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
          id="checkboxes-tags-demo"
          options={jobs}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          renderOption={(option, { selected }) => (
            <>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </>
          )}
          renderInput={(params) => (
            <TextField
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
