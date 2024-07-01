import React from "react";
import { SessionContext } from "../context/SessionContext";

export default function useSession() {
  const sessionCtx = React.useContext(SessionContext);
  return sessionCtx?.session ?? ({} as typeof sessionCtx.session);
}
