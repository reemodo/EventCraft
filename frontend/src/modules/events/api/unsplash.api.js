import { createApi } from "unsplash-js";
import nodeFetch from "node-fetch";
import { apiUnsplashAccessKey } from "../../../env";

const unsplash = createApi({
  accessKey: apiUnsplashAccessKey,
  fetch: nodeFetch,
});
