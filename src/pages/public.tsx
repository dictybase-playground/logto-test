import { ACCESS } from "../constants";

const Public = () =>
  <> 
    You've reacted a public page. This page is accessible by any user or guest.
  </>

const access = ACCESS.public;
export { access };

export default Public;
