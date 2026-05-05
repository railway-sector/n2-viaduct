import{oO as u,qO as d,cY as m,Hi as b,Go as x,fL as y,lA as O}from"./index-KQAUaoGq.js";import{e as j}from"./ShaderCompiler-G2XYGDs6.js";import{e as v}from"./ProgramTemplate-BsMs_HdP.js";function c(r){const{options:e,value:n}=r;return typeof e[n]=="number"}function p(r){let e="";for(const n in r){const o=r[n];if(typeof o=="boolean")o&&(e+=`#define ${n}
`);else if(typeof o=="number")e+=`#define ${n} ${o.toFixed()}
`;else if(typeof o=="object")if(c(o)){const{value:t,options:f,namespace:i}=o,s=i?`${i}_`:"";for(const a in f)e+=`#define ${s}${a} ${f[a].toFixed()}
`;e+=`#define ${n} ${s}${t}
`}else{const t=o.options;let f=0;for(const i in t)e+=`#define ${t[i]} ${(f++).toFixed()}
`;e+=`#define ${n} ${t[o.value]}
`}}return e}export{u as BufferObject,d as FramebufferObject,m as Program,b as ProgramCache,x as Renderbuffer,j as ShaderCompiler,y as Texture,O as VertexArrayObject,v as createProgram,p as glslifyDefineMap};
