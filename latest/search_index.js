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
    "location": "api.html#Mortar3D.approx_in-Tuple{Any,Any}",
    "page": "API",
    "title": "Mortar3D.approx_in",
    "category": "method",
    "text": "approx_in(q, P)\n\nTest does vector P contain approximately q. This function uses isapprox() internally to make boolean test.\n\nExample\n\nP = Vector[[1.0, 1.0], [2.0, 2.0]]\nq = [1.0, 1.0] + eps(Float64)\nin(q, P), approx_in(q, P)\n\n# output\n\n(false, true)\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.calculate_normals-Tuple{Any,Any,Any}",
    "page": "API",
    "title": "Mortar3D.calculate_normals",
    "category": "method",
    "text": "calculate_normals(elements::Dict{Int, Vector{Int}},\n                  element_types::Dict{Int, Symbol},\n                  X::Dict{Int, Vector{Float64})\n\nGiven elements, element types and node locations, calculate nodal normals by first calculating normal directions for each element and then averaging them in nodes. As a result we get unique normal direction defined to each node.\n\nNotes\n\nOnly linear elements supported.\n\nExample\n\nX = Dict(1 => [0.0, 0.0, 0.0], 2 => [1.0, 0.0, 0.0], 3 => [0.0, 1.0, 0.0])\nelements = Dict(1 => [1, 2, 3])\nelement_types = Dict(1 => :Tri3)\nnormals = calculate_normals(elements, element_types, X)\n\n# output\n\nDict{Int64,Array{Float64,1}} with 3 entries:\n  2 => [0.0, 0.0, 1.0]\n  3 => [0.0, 0.0, 1.0]\n  1 => [0.0, 0.0, 1.0]\n\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.calculate_polygon_clip-Union{Tuple{Array{T,1},Array{T,1},T}, Tuple{T}} where T",
    "page": "API",
    "title": "Mortar3D.calculate_polygon_clip",
    "category": "method",
    "text": "calculate_polygon_clip(xs, xm, n)\n\nGiven two polygons xs and xm, calculate polygon clipping P. It is assumed that clipping is done in direction n.\n\nExample\n\nxs = Vector[[0, 0, 0], [1, 0, 0], [0, 1, 0]]\nxm = Vector[[-1/4, 1/2, 0], [1/2, -1/4, 0], [3/4, 3/4, 0]]\nn = [0, 0, 1]\nP = calculate_polygon_clip(xs, xm, n)\n\n# output\n\n6-element Array{Array{T,1} where T,1}:\n [0.65, 0.35, 0.0]\n [0.5625, 0.0, 0.0]\n [0.25, 0.0, 0.0]\n [0.0, 0.25, 0.0]\n [0.0, 0.5625, 0.0]\n [0.35, 0.65, 0.0]\n\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.check_orientation!-Tuple{Any,Any}",
    "page": "API",
    "title": "Mortar3D.check_orientation!",
    "category": "method",
    "text": "check_orientation!(P, n)\n\nGiven polygon P and normal direction n, ensure that polygon vertices are ordered in counter clock wise direction with respect to surface normal. It is assumed that polygon is convex.\n\nExample\n\nUnit triangle, normal in z-direction:\n\nP = Vector[[0.0, 0.0, 0.0], [0.0, 1.0, 0.0], [1.0, 0.0, 0.0]]\nn = [0.0, 0.0, 1.0]\ncheck_orientation!(P, n)\n\n# output\n\n3-element Array{Array{T,1} where T,1}:\n [1.0, 0.0, 0.0]\n [0.0, 0.0, 0.0]\n [0.0, 1.0, 0.0]\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.is_vertex_inside_polygon-Tuple{Any,Any}",
    "page": "API",
    "title": "Mortar3D.is_vertex_inside_polygon",
    "category": "method",
    "text": "is_vertex_inside_polygon(q, P; atol=1.0e-3)\n\nTest is vertex q inside polygon P with given tolerance.\n\nExample\n\nP = Vector[[0.0,0.0,0.0], [1.0,0.0,0.0], [0.0,1.0,0.0]]\nq1 = [ 0.1, 0.0, 0.0]\nq2 = [-0.1, 0.1, 0.0]\nis_vertex_inside_polygon(q1, P), is_vertex_inside_polygon(q2, P)\n\n# output\n\n(true, false)\n\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.project_from_plane_to_surface-Tuple{Type{Val{:Tri3}},Any,Any,Any,Any,Any}",
    "page": "API",
    "title": "Mortar3D.project_from_plane_to_surface",
    "category": "method",
    "text": "project_from_plane_to_surface(Val{:Tri3}, p, n, x1, x2, x3)\n\nProject vertex p to surface of Tri3 element.\n\nExample\n\np = [1/3, 1/3, 0.0]\nn = [0.0, 0.0, 1.0]\nx1 = [0.0, 0.0, 1.0]\nx2 = [1.0, 0.0, 1.0]\nx3 = [0.0, 1.0, 1.0]\ntheta, d = project_from_plane_to_surface(Val{:Tri3}, p, n, x1, x2, x3)\nround.(theta, 3), d\n\n# output\n\n([0.333, 0.333], 1.0)\n\n\n\n"
},

{
    "location": "api.html#Mortar3D.project_from_surface_to_plane-Tuple{Any,Any,Any}",
    "page": "API",
    "title": "Mortar3D.project_from_surface_to_plane",
    "category": "method",
    "text": "project_from_surface_to_plane(p, x0, n0)\n\nFind the projection of vertex p to the auxiliary plane (x0, n0), where x0 is the origo of plane and n0 is unit normal of plane.\n\nExample\n\np = [1.0, 1.0, 3.0]\nx0 = [0.0, 0.0, 0.0]\nn0 = [0.0, 0.0, 1.0]\nproject_from_surface_to_plane(p, x0, n0)\n\n# output\n3-element Array{Float64,1}:\n 1.0\n 1.0\n 0.0\n\n\n\n\n"
},

{
    "location": "api.html#Index-1",
    "page": "API",
    "title": "Index",
    "category": "section",
    "text": "DocTestSetup = quote\n    using Mortar3D\n    using Mortar3D: calculate_normals\n    using Mortar3D: project_from_plane_to_surface, project_from_surface_to_plane\n    using Mortar3D: approx_in, is_vertex_inside_polygon, check_orientation!, calculate_polygon_clip\nendModules = [Mortar3D]"
},

]}
