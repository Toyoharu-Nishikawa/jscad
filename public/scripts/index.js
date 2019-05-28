import {jscad} from "./jscad/index.js"
import {login} from "./necoengine/index.js"

login.setLoginButton()
login.visit()

jscad.initialize()
