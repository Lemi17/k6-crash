//Dragon
//https://dev.aslotcasino.cc/gs2c/prepareGame2.do?g=pt_rocket&o=1&p=stat&c=10&n=1

import http from "k6/http";
import { sleep } from "k6";
import ws from "k6/ws";
import { check } from "k6";
import { SharedArray } from "k6/data";

export const options = {
  vus: 1,
  duration: "100s",
  rps: 200,
  iterations: 1,
};

const urlServer = "https://rocket-test.aslotcasino.cc/api";

const generatedTokensArray = [
  "ZkhlYlZ2dnF6SkZSNEQ0K25VMklyS0lnODRpVVR5ZHRNbGcvd3hUbGF2cDRiQVBDb3BRWHZBUUJYQm9tTnJOSg==",
  "TVQyYURvbS9jUjFhVVZZTjBXbXdaZnZ0VjlhRHhqbXJUcis2SjkydXA0enoyQk5VTENnSGFYMjRUTEgzcU80VA==",
  "bGFiRnEwOHIyM1FHdUJMOXJURk9GUWxRYWxCNzlCL0JWb0xNV2NxM0NhNHNUNnhXQTQyWEFwQ09aRFF5a2Vpdw==",
  "UUd1TGlJZlBFMzFLaGZmMW8zUitRc1RtUlZMalovZUdGZHNaRWRkQnVQOVcza29XQkx3WmdMMFVFRWlpMmVOSg==",
  "aEpzY29BRjh5Tzd5Um8xM3FDdWhYcmIrUUtuOXQxWERMa09zUmRqTGdzREM5SWdaZ2pNYzdQUGFEOHJLUi9uRQ==",
  "dTErMDVabkdkc1o3NEc4Y25VQ0prTVZMc1dsK21Zdkovem1pQzlJOEltQisvcElySFc3R3I0elZkOGdsZG1YWg==",
  "QjNHSyt6ZHRZQzNDeFVxdkZEa0dvcEdYaGVuN29xTTRSU2VwNXRxYlVvbThDUTBzUDlIem9SazRpWEMwT2JyUQ==",
  "bmQxKzZ3SVgvQXNkMndGZHkrNnVxQm4rbEJXZml6NUt0b0ZyanlJNXI3MjBWZEVZeFgvREUzRlJyZnF6RUlDRA==",
  "MWxzVkcrSW85eGMrQVlWeldsdnJNWGNDNHNtOXZ0VGhMN3FQUklkdnZZWHl1cGNnQlVNYmJtVzVxUzRxQnovcg==",
  "RHFsbW1ubTFESHYxSEY1WjM0em1FT1hrUUltK0wrY29jL096UkJTcUJwNURiWlpSRzJBNGNNaGsrSFoyRjFTKw==",
];
console.log("pocetak");
console.log("pocetak 2 ");
console.log("pocetak 333");

export default function test() {
  const accessTokens = [];
  const numOfWantedTokens = 1000;

  while (accessTokens.length < numOfWantedTokens) {
    const slotsToken = generatedTokensArray[accessTokens.length];
    const resAuth = http.post(
      urlServer + "/Authenticate/Tokens" + "?slotsToken=" + slotsToken,
      null
    );

    if (resAuth.status === 200) {
      const accessToken = JSON.parse(resAuth.body).accessToken;
      accessTokens.push(accessToken);
      console.log(accessTokens.length);
    }
  }

  console.log(">>>>>>>>>>>>>>>>>>>>>>>", accessTokens);
}
