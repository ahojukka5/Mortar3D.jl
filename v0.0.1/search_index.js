var documenterSearchIndex = {"docs": [

{
    "location": "index.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Mortar3D.jl-documentation-1",
    "page": "Introduction",
    "title": "Mortar3D.jl documentation",
    "category": "section",
    "text": "Pages = [\"index.md\", \"theory.md\", \"api.md\"]Mortar3D.jl is a julia package to calculate discrete projections between non-conforming finite element mesheds. The resulting \"mortar matrices\" can be used to tie non-conforming finite element meshes together which are meshed separately to construct bigger models.Using mortar methods in mesh tie problems results variationally consistent solution. Mathematically, goal is to solve mixed problem with primary field variable and Lagrange multipliers, which have a physical meaning (e.g. contact pressure if unknown field is displacement). The problem arising is a typical saddle point problem with zeros on diagonal.Mortar3D.jl is part of JuliaFEM. All codes are MIT licensed."
},

{
    "location": "index.html#Installing-and-testing-package-1",
    "page": "Introduction",
    "title": "Installing and testing package",
    "category": "section",
    "text": "Installing package goes same way like other packages in julia, i.e.julia> Pkg.add(\"Mortar3D\")Testing package can be done using Pkg.test, i.e.julia> Pkg.test(\"Mortar3D\")"
},

{
    "location": "index.html#Contributing-1",
    "page": "Introduction",
    "title": "Contributing",
    "category": "section",
    "text": "Have a new great idea and want to share it with the open source community? From here and here you can look for coding style. Here is explained how to contribute to open source project, in general."
},

{
    "location": "theory.html#",
    "page": "Theory",
    "title": "Theory",
    "category": "page",
    "text": ""
},

{
    "location": "theory.html#Theory-1",
    "page": "Theory",
    "title": "Theory",
    "category": "section",
    "text": ""
},

{
    "location": "api.html#",
    "page": "API",
    "title": "API",
    "category": "page",
    "text": ""
},

{
    "location": "api.html#API-documentation-1",
    "page": "API",
    "title": "API documentation",
    "category": "section",
    "text": ""
},

{
    "location": "api.html#Index-1",
    "page": "API",
    "title": "Index",
    "category": "section",
    "text": "DocTestSetup = quote\n    using Mortar3D\nendModules = [Mortar3D]"
},

]}
