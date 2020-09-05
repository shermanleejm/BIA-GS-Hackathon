import React, { Component } from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

function CustomCircularProgress(props) {
  return (
    <div>
      <Box position="relative" display="inline-flex">
        <CircularProgress variant="static" value={props.level} size={100} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption" component="div" color="textSecondary">
            {props.content}
          </Typography>
        </Box>
      </Box>
    </div>
  );
}

export default CustomCircularProgress;
