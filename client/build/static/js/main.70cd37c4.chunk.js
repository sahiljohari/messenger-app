(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{102:function(e,t,a){e.exports={root:"InfoBar_root__2iDUk"}},111:function(e,t,a){e.exports=a(209)},13:function(e,t,a){e.exports={root:"MessageBubble_root__LFdHb",userMessageBubble:"MessageBubble_userMessageBubble__Jy7J_",remoteMessageBubble:"MessageBubble_remoteMessageBubble__2xHqA",remoteUserMessageBubble:"MessageBubble_remoteUserMessageBubble__2tYU9",userNameText:"MessageBubble_userNameText__insKR",messageText:"MessageBubble_messageText__3L-df"}},154:function(e,t){},209:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(24),s=a.n(r),l=a(21),c=a(18),u=a(91),i=a.n(u),m=a(109),_=a(10),g=a(3),f=a.n(g),d=a(27),b=a.n(d),p=a(92),h=a.n(p),E=function(e){return o.a.createElement("input",Object.assign({className:h.a.root},e))},v=a(59),M=a.n(v),x=function(e){var t=e.header,a=e.children,n=e.className,r=e.hasFormContent,s=void 0!==r&&r;return o.a.createElement("div",{className:f()(M.a.root,n)},o.a.createElement("h2",null,t),s?o.a.createElement("form",{className:M.a.form},a):a)},N=/\/*$/g,j=/^\/*/g,O=/\/{2,}/g,B=function(e,t){return"".concat(e).concat(t).replace(N,"").replace(j,"/").replace(O,"/")},C={root:"/",forbidden:"/forbidden"};C.chat=B(C.root,"/chat"),C.logout=B(C.root,"/logout");var S,w=C,y={login_header:{defaultMessage:"Sign in to Chat-Pad"},submit_button_label:{defaultMessage:"Proceed"},username_error_message:{defaultMessage:"Username already in use"}},k=function(e){var t=e.location,a=Object(n.useState)(""),r=Object(_.a)(a,2),s=r[0],c=r[1],u=Object(n.useState)(""),i=Object(_.a)(u,2),g=i[0],d=i[1],p=t.pathname,h=[{value:s,autoFocus:!0,placeholder:"Enter user name",onChange:function(e){return c(e.target.value)}},{value:g,placeholder:"Enter the chat room name",onChange:function(e){return d(e.target.value)}}],v=!!s&&!!g;return o.a.createElement(x,{header:y.login_header.defaultMessage,className:b.a.root,hasFormContent:!0},h.map((function(e,t){var a=e.type,n=Object(m.a)(e,["type"]),r=a||E;return o.a.createElement(r,Object.assign({key:t},n))})),o.a.createElement(l.b,{to:"".concat(w.chat,"?name=").concat(s,"&room=").concat(g)},o.a.createElement("button",{onClick:function(){c(""),d("")},disabled:!v,className:v?b.a.submitButton:f()(b.a.submitButton,b.a.submitButtonDisabled),type:"submit"},o.a.createElement("i",{className:"far fa-arrow-alt-circle-right"}))),p===w.forbidden&&o.a.createElement("p",{className:b.a.errorMessage},y.username_error_message.defaultMessage))},I=a(95),L=a.n(I),P={logout_message:{defaultMessage:"You have successfully left the room."},login_again_message:{defaultMessage:"Login again"}},F=function(){return o.a.createElement(x,{header:P.logout_message.defaultMessage,className:L.a.root},o.a.createElement(l.b,{to:w.root},P.login_again_message.defaultMessage))},T=a(107),U=a(96),A=a.n(U),D=a(97),H=a.n(D),J=a(98),R=a.n(J),V=Object(n.createContext)(null),Y=function(e){var t=e.values,a=e.children;return o.a.createElement(V.Provider,{value:t},a)},Q=a(34),q=a.n(Q),K={panel_header:{defaultMessage:"Members"}},z=a(40),W=a.n(z),Z=function(){var e=Object(n.useContext)(V).users;return o.a.createElement("div",{className:q.a.root},o.a.createElement("div",{className:q.a.panelHeader},K.panel_header.defaultMessage),o.a.createElement("div",null,e.map((function(e,t){var a=e.name;return o.a.createElement("div",{key:t,className:q.a.panelListItem},o.a.createElement("i",{className:"fas fa-user-circle"}),o.a.createElement("p",{className:q.a.userName},W()(a)))}))))},$=a(99),X=a.n($),G=a(214),ee=a(218),te=a(101),ae=a(62),ne=a.n(ae),oe={input_placeholder:{defaultMessage:"Type something..."},send_button_text:{defaultMessage:" Send"}},re=function(){var e=Object(n.useContext)(V).sendMessage,t=Object(n.useState)(""),a=Object(_.a)(t,2),r=a[0],s=a[1],l=function(t){e(t,r),s("")};return o.a.createElement(G.a,{className:ne.a.root},o.a.createElement(ee.a,{className:ne.a.textInput,value:r,placeholder:oe.input_placeholder.defaultMessage,autoFocus:!0,onChange:function(e){s(e.target.value)},onKeyPress:function(e){return"Enter"===e.key?l(e):null}}),o.a.createElement(G.a.Append,null,o.a.createElement(te.a,{variant:"light",onClick:function(e){return l(e)},disabled:!r},o.a.createElement("i",{className:"far fa-paper-plane"}),oe.send_button_text.defaultMessage)))},se=a(13),le=a.n(se),ce=function(e){var t=e.user,a=e.message,n=e.isFromNativeUser,r="chat master"!==t?f()(le.a.root,le.a.remoteUserMessageBubble):f()(le.a.root,le.a.remoteMessageBubble),s=n?f()(le.a.root,le.a.userMessageBubble):f()(le.a.root,r),l=n?"You":W()(t);return o.a.createElement("div",{className:s},"chat master"!==t&&o.a.createElement("p",{className:le.a.userNameText},l),o.a.createElement("p",{className:le.a.messageText},a))},ue=a(216),ie=a(217),me=a(215),_e=a(102),ge=a.n(_e),fe={sign_in_text:{defaultMessage:"Signed in as: "},logout_text:{defaultMessage:"Sign Out"}},de=function(){var e=Object(n.useContext)(V),t=e.userName,a=e.chatRoom;return o.a.createElement(ue.a,{className:ge.a.root,bg:"dark",variant:"dark"},o.a.createElement(ue.a.Brand,null,a),o.a.createElement(ue.a.Toggle,null),o.a.createElement(ue.a.Collapse,{className:"justify-content-end"},o.a.createElement(ie.a,null,o.a.createElement(me.a,{title:"".concat(fe.sign_in_text.defaultMessage).concat(t),id:"collapsible-nav-dropdown"},o.a.createElement(me.a.Item,null,"Invite friends"),o.a.createElement(me.a.Divider,null),o.a.createElement(me.a.Item,{href:w.logout},fe.logout_text.defaultMessage)))))},be=a(35),pe=a.n(be),he=function(){var e=Object(n.useContext)(V),t=e.userName,a=e.messages;return o.a.createElement("div",{className:pe.a.root},o.a.createElement(de,null),o.a.createElement(X.a,{className:pe.a.messages,followButtonClassName:pe.a.followButton,scrollViewClassName:pe.a.scrollView},a.map((function(e,a){var n=e.user,r=e.text,s=n===t;return o.a.createElement(ce,{key:a,user:n,message:r,isFromNativeUser:s})}))),o.a.createElement(re,null))},Ee=function(e){var t=e.location,a=Object(n.useState)(""),r=Object(_.a)(a,2),s=r[0],l=r[1],u=Object(n.useState)(""),i=Object(_.a)(u,2),m=i[0],g=i[1],f=Object(n.useState)([]),d=Object(_.a)(f,2),b=d[0],p=d[1],h=Object(n.useState)(""),E=Object(_.a)(h,2),v=E[0],M=E[1],x=Object(n.useState)([]),N=Object(_.a)(x,2),j=N[0],O=N[1],B=Object(n.useState)(!1),C=Object(_.a)(B,2),y=C[0],k=C[1];Object(n.useEffect)((function(){var e=A.a.parse(t.search,{ignoreQueryPrefix:!0}),a=e.name,n=e.room;return S=H()("https://simple-messenger-app.herokuapp.com/"),l(a),g(n),S.emit("join",{name:a,room:n},(function(e){e&&k(!0)})),function(){S.emit("disconnect"),S.off()}}),[t.search]),Object(n.useEffect)((function(){S.on("message",(function(e){var t=e.user,a=e.text;O((function(e){return[].concat(Object(T.a)(e),[{user:t,text:a}])}))})),S.on("roomData",(function(e){var t=e.users;p(t)}))}),[]);var I=Object(n.useCallback)((function(e,t){e.preventDefault(),t&&S.emit("sendMessage",t,(function(){return M(t)}))}),[]),L=Object(n.useMemo)((function(){return{users:b,userName:s,chatRoom:m,message:v,messages:j,sendMessage:I}}),[b,s,m,v,j,I]);return y?o.a.createElement(c.a,{exact:!0,to:w.forbidden}):o.a.createElement(Y,{values:L},o.a.createElement("div",{className:R.a.root},o.a.createElement(Z,null),o.a.createElement(he,null)))},ve=function(){return o.a.createElement("div",{className:i.a.root},o.a.createElement(l.a,null,o.a.createElement(c.d,null,o.a.createElement(c.b,{path:[w.root,w.forbidden],exact:!0,component:k}),o.a.createElement(c.b,{path:w.chat,exact:!0,component:Ee}),o.a.createElement(c.b,{path:w.logout,exact:!0,component:F}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(ve,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},27:function(e,t,a){e.exports={root:"Login_root__JDZyA",submitButton:"Login_submitButton__OPa12",submitButtonDisabled:"Login_submitButtonDisabled__2Aozr",errorMessage:"Login_errorMessage__rDp07"}},34:function(e,t,a){e.exports={root:"SidePanel_root__1mnfR",panelHeader:"SidePanel_panelHeader__l2jmZ",panelListItem:"SidePanel_panelListItem__1InAS",userName:"SidePanel_userName__3fiVN",panelFooter:"SidePanel_panelFooter__2eiUQ"}},35:function(e,t,a){e.exports={root:"ChatContainer_root__2AqXN",messages:"ChatContainer_messages__32qcf",scrollView:"ChatContainer_scrollView__LPmrL",followButton:"ChatContainer_followButton__3RHzO"}},59:function(e,t,a){e.exports={root:"Section_root__28QKv",form:"Section_form__1y6YA"}},62:function(e,t,a){e.exports={root:"ChatInputField_root__1LQLT",textInput:"ChatInputField_textInput__3TvU7"}},91:function(e,t,a){e.exports={root:"App_root__29vpP"}},92:function(e,t,a){e.exports={root:"TextInput_root__5A0ki"}},95:function(e,t,a){e.exports={root:"Logout_root__kYhS_"}},98:function(e,t,a){e.exports={root:"Chat_root__2dI5M"}}},[[111,1,2]]]);
//# sourceMappingURL=main.70cd37c4.chunk.js.map