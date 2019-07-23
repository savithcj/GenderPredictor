(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{27:function(e,a,t){e.exports=t(57)},32:function(e,a,t){},57:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(22),i=t.n(l);t(32);function s(){return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-dark bg-dark"},r.a.createElement("span",{className:"navbar-brand",href:"#"},"Image Based Gender Predictor"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},r.a.createElement("ul",{className:"navbar-nav mr-auto"},r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"https://github.com/savithcj/ImageBasedGenderPrediction",target:"_blank",rel:"noopener noreferrer"},"Repo")),r.a.createElement("li",{className:"nav-item active"},r.a.createElement("a",{className:"nav-link",href:"https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/",target:"_blank",rel:"noopener noreferrer"},"Dataset")))))}function o(){return r.a.createElement("div",{className:"container-fluid my-4"},r.a.createElement("h4",{className:"my-4"},"Upload an image and get a gender prediction."),r.a.createElement("p",null,"This is a demo for a Convolutional Neural Network (CNN) model trained with the IMDB face images dataset."))}var c=t(5),u=t(6),m=t(26),d=t(23),h=t(4),g=t(25),f=t(7),p=t.n(f);var v=function(){function e(){Object(c.a)(this,e)}return Object(u.a)(e,null,[{key:"changeHeightWidth",value:function(e,a,t,n){return t>n&&(e=Math.round(e*n/t),t=n),e>a&&(t=Math.round(t*a/e),e=a),{height:e,width:t}}},{key:"resizeAndRotateImage",value:function(e,a,t){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"jpeg",r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:100,l=arguments.length>5&&void 0!==arguments[5]?arguments[5]:0,i=r/100,s=document.createElement("canvas"),o=e.width,c=e.height,u=this.changeHeightWidth(c,a,o,t);90===l||270===l?(s.width=u.height,s.height=u.width):(s.width=u.width,s.height=u.height),o=u.width,c=u.height;var m=s.getContext("2d");return l&&(m.rotate(l*Math.PI/180),90===l?m.translate(0,-s.width):180===l?m.translate(-s.width,-s.height):270===l?m.translate(-s.height,0):0!==l&&360!==l||m.translate(0,0)),m.drawImage(e,0,0,o,c),s.toDataURL("image/".concat(n),i)}},{key:"b64toBlob",value:function(e,a){a=a||"image/jpeg";for(var t=atob(e.toString().replace(/^data:image\/(png|jpeg|jpg);base64,/,"")),n=[],r=0;r<t.length;r+=512){for(var l=t.slice(r,r+512),i=new Array(l.length),s=0;s<l.length;s++)i[s]=l.charCodeAt(s);var o=new Uint8Array(i);n.push(o)}return new Blob(n,{type:a})}},{key:"createResizedImage",value:function(a,t,n,r,l,i,s){var o=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"base64",c=null,u=new FileReader;a?(u.readAsDataURL(a),u.onload=function(){var u=new Image;!function(e,a,t){p.a.parseMetaData(e,function(n){var r=0;n.exif&&(r=n.exif.get("Orientation")),p()(e,function(e){try{var n=e.toDataURL("image/jpeg");a.src=n}catch(r){t("error")}},{canvas:!0,orientation:r})})}(a,u,s),u.onload=function(){var a=e.resizeAndRotateImage(u,t,n,r,l,i);c=e.b64toBlob(a,"image/".concat(r)),s("blob"===o?c:a)}},u.onerror=function(e){s("error")}):s("File Not Found")}}]),e}(),b=function(e,a,t,n,r,l,i,s){return v.createResizedImage(e,a,t,n,r,l,i,s)},E=t(24),N=t.n(E),y=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(m.a)(this,Object(d.a)(a).call(this,e))).state={file:null,isLoading:!1,result:null,errorOccurred:!1,errorMessage:null},t.onFormSubmit=t.onFormSubmit.bind(Object(h.a)(t)),t.onChange=t.onChange.bind(Object(h.a)(t)),t}return Object(g.a)(a,e),Object(u.a)(a,[{key:"onFormSubmit",value:function(e){var a=this;e.preventDefault(),(new FormData).append("myImage",this.state.file),this.setState({isLoading:!0,file:null}),N()({method:"post",url:"https://baroque-saucisson-79648.herokuapp.com/prediction",timeout:1e4,headers:{"Content-Type":"image/jpeg"},data:this.state.file}).then(function(e){a.setState({result:e.data}),a.setState({isLoading:!1})}).catch(function(e){"ECONNABORTED"===e.code?a.setState({errorOccurred:!0,errorMessage:"API timed out. Please try again.",isLoading:!1}):(console.log("API call failed.",e),a.setState({errorOccurred:!0,errorMessage:"API call failed. Please try again.",isLoading:!1}))})}},{key:"onChange",value:function(e){var a=this;this.setState({result:null,file:null,errorOccurred:!1,errorMessage:null}),b(e.target.files[0],1e3,1e3,"JPEG",60,0,function(e){if("error"!==e)if("File Not Found"!==e){var t=e.replace(/^data:image\/[a-z]+;base64,/,"");a.setState({file:t})}else a.setState({file:null});else a.setState({file:null,errorOccurred:!0,errorMessage:"Error reading file. Please make sure the file is an image."})},"base64")}},{key:"render",value:function(){var e=r.a.createElement("div",{className:"spinner-border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")),a=this.state.file?r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"text-center"},"Selected Image"),r.a.createElement("img",{src:"data:image/jpg;base64,"+this.state.file,alt:"failed to load",className:"img-fluid"})):null,t=this.state.result?r.a.createElement(r.a.Fragment,null,r.a.createElement("h5",{className:"text-center"},"Result"),r.a.createElement("img",{src:"data:image/jpg;base64,"+this.state.result,alt:"failed to load",className:"img-fluid"})):null,n=r.a.createElement("h6",null,this.state.errorMessage),l=this.state.isLoading?e:t;return r.a.createElement("div",{className:"container-fluid my-5 text-center"},r.a.createElement("form",{onSubmit:this.onFormSubmit},r.a.createElement("div",{className:"input-group"},r.a.createElement("div",{className:"custom-file"},r.a.createElement("input",{type:"file",className:"custom-file-input",id:"inputGroupFile04",name:"myImage",onChange:this.onChange,disabled:this.state.isLoading}),r.a.createElement("label",{className:"custom-file-label text-left",htmlFor:"inputGroupFile04"},this.state.file?"Click evaluate":"Select image")),r.a.createElement("div",{className:"input-group-append"},r.a.createElement("button",{className:"btn btn-outline-secondary",type:"submit",disabled:!this.state.file},"Evaluate")))),r.a.createElement("div",{className:"container-fluid my-5"},this.state.errorOccurred&&this.state.errorMessage?n:null,a,l))}}]),a}(r.a.Component);function w(){return r.a.createElement("div",{className:"container-fluid my-4"},r.a.createElement("p",null,"When the evaluate button is pressed, the site makes a call to a RESTful API. The API uses the"," ",r.a.createElement("a",{href:"https://docs.opencv.org/3.4.1/d7/d8b/tutorial_py_face_detection.html",target:"_blank",rel:"noopener noreferrer"},"OpenCV Haar Feature-based Cascade Classifier")," ","to detect if a face is present in the uploaded image. Any detected faces are then classified for gender using the CNN."),r.a.createElement("p",null,"In the event that the Haar Cascade Classifier fails to detect any faces, the uploaded image will be returned unchanged."))}var k=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(s,null),r.a.createElement("div",{className:"container"},r.a.createElement(o,null),r.a.createElement(y,null),r.a.createElement(w,null)))};t(21),t(56);i.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[27,1,2]]]);
//# sourceMappingURL=main.fc782a4a.chunk.js.map