import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import hoc from "./hoc";

const User = ({ user, deleteUser, handleEdit, classes }) => {
  return (
    <Grid item xs={12}>
      <Paper className={classes.paper}>
        <Grid item xs={8} sm={10} key={user.id}>
          <Typography variant="h6" gutterBottom>
            Name: {user.name}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Email: {user.email}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={2}>
          <IconButton
            aria-label="edit"
            color="secondary"
            onClick={() => handleEdit(user)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => deleteUser({ variables: { id: user.id } })}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default hoc(User);
