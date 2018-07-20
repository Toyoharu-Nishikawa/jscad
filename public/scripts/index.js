import {jscad} from "./jscad/index.js"
import {login} from "/necoengine/scripts/necoengine/login/index.js"

login.setLoginButton()
login.visit()

jscad.initialize()
