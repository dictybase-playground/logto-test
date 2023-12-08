import { Typography, Stack } from "@mui/material"

const Root = () => {
  return (
    <Stack spacing={1}>
      <Typography variant="h4">Front page</Typography>
      <Typography>
        To test a <b>public route,</b> click the link in the navigation.
      </Typography>
      <Typography>
        To test a <b>protected route,</b> click the link in the navigation. It
        should display different messages depending on your role.
      </Typography>
      <Typography>
        To test a <b>private route</b> as an authenticated user, click the user
        icon in the top right.
      </Typography>
      <Typography>
        To test a <b>private route</b> as an unauthenticated user, navigate to
        /user from the address bar.
      </Typography>
    </Stack>
  )
}

export { Root }
