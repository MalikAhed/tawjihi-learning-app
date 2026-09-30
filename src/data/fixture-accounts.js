// Local accounts for the API-free fixture preview; HTTP sessions never load these.
/** @type {ReadonlyArray<{type:"free"|"subscribed"|"banned", displayName:string, identifier:string, email:string, phone:string, password:string, homeScenarioId:string}>} */
export const FIXTURE_ACCOUNTS = Object.freeze([
  { type:"free", displayName:"أحمد", identifier:"free", email:"free@example.com", phone:"0591111111", password:"Learn123", homeScenarioId:"student-must-review" },
  { type:"subscribed", displayName:"ليان", identifier:"subscribed", email:"subscribed@example.com", phone:"0592222222", password:"Learn123", homeScenarioId:"student-paid" },
  { type:"banned", displayName:"مستخدم", identifier:"banned", email:"banned@example.com", phone:"0593333333", password:"Learn123", homeScenarioId:"student-banned" },
]);
