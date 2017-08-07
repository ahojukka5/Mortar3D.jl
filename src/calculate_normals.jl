# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

"""
    calculate_normals(elements::Dict{Int, Vector{Int}},
                      element_types::Dict{Int, Symbol},
                      X::Dict{Int, Vector{Float64})

Given elements, element types and node locations, calculate nodal normals by
first calculating normal directions for each element and then averaging them
in nodes. As a result we get unique normal direction defined to each node.

# Notes
Only linear elements supported.

# Example

```jldoctest
X = Dict(1 => [0.0, 0.0, 0.0], 2 => [1.0, 0.0, 0.0], 3 => [0.0, 1.0, 0.0])
elements = Dict(1 => [1, 2, 3])
element_types = Dict(1 => :Tri3)
normals = calculate_normals(elements, element_types, X)

# output

Dict{Int64,Array{Float64,1}} with 3 entries:
  2 => [0.0, 0.0, 1.0]
  3 => [0.0, 0.0, 1.0]
  1 => [0.0, 0.0, 1.0]

```
"""
function calculate_normals(elements, element_types, X)
    normals = similar(X)
    for (elid, elcon) in elements
        @assert element_types[elid] == :Tri3
        p1 = X[elcon[1]]
        p2 = X[elcon[2]]
        p3 = X[elcon[3]]
        n = cross(p2-p1, p3-p1)
        n /= norm(n)
        for nid in elcon
            haskey(normals, nid) || (normals[nid] = zeros(3))
            normals[nid] += n
        end
    end
    for (nid, n) in normals
        normals[nid] /= norm(normals[nid])
    end
    return normals
end
