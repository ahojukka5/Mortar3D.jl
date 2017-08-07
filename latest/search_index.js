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
    "location": "api.html#Mortar3D.calculate_normals-Tuple{Any,Any,Any}",
    "page": "API",
    "title": "Mortar3D.calculate_normals",
    "category": "Method",
    "text": "calculate_normals(elements::Dict{Int, Vector{Int}},\n                  element_types::Dict{Int, Symbol},\n                  X::Dict{Int, Vector{Float64})\n\nGiven elements, element types and node locations, calculate nodal normals by first calculating normal directions for each element and then averaging them in nodes. As a result we get unique normal direction defined to each node.\n\nNotes\n\nOnly linear elements supported.\n\nExample\n\nX = Dict(1 => [0.0, 0.0, 0.0], 2 => [1.0, 0.0, 0.0], 3 => [0.0, 1.0, 0.0])\nelements = Dict(1 => [1, 2, 3])\nelement_types = Dict(1 => :Tri3)\nnormals = calculate_normals(elements, element_types, X)\n\n# output\n\nDict{Int64,Array{Float64,1}} with 3 entries:\n  2 => [0.0, 0.0, 1.0]\n  3 => [0.0, 0.0, 1.0]\n  1 => [0.0, 0.0, 1.0]\n\n\n\n\n"
},

{
    "location": "api.html#Index-1",
    "page": "API",
    "title": "Index",
    "category": "section",
    "text": "DocTestSetup = quote\n    using Mortar3D\n    using Mortar3D: calculate_normals\nendModules = [Mortar3D]"
},

]}
