import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const housingTypes = [
  { value: "Student Housing", label: "Student Housing" },
  { value: "Greek Housing", label: "Greek Housing" },
  { value: "Off-campus House", label: "Off-Campus House" },
  { value: "Off-campus Apartment", label: "Off-Campus Apartments" },
];

const locationTypes = [
  {
    value: "East",
    label: "East",
  },
  {
    value: "West",
    label: "West",
  },
];

export default function StudentSignUp() {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <TextField
          id="housing-type"
          select
          label="Housing Type"
          fullWidth
          autoFocus
          defaultValue="Greek Housing"
          variant="outlined"
          required
        >
          {housingTypes.map((housingType) => (
            <MenuItem key={housingType.value} value={`${housingType.value}`}>
              {housingType.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="location"
          select
          label="Location"
          fullWidth
          autoFocus
          variant="outlined"
          required
          defaultValue="East"
        >
          {locationTypes.map((locationType) => (
            <MenuItem key={locationType.value} value={`${locationType.value}`}>
              {locationType.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </>
  );
}
