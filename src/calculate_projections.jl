# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

"""
    project_from_surface_to_plane(p, x0, n0)

Find the projection of vertex `p` to the auxiliary plane (x0, n0), where
`x0` is the origo of plane and `n0` is unit normal of plane.

# Example

```jldoctest
p = [1.0, 1.0, 3.0]
x0 = [0.0, 0.0, 0.0]
n0 = [0.0, 0.0, 1.0]
project_from_surface_to_plane(p, x0, n0)

# output
3-element Array{Float64,1}:
 1.0
 1.0
 0.0

```
"""
function project_from_surface_to_plane(p, x0, n0)
    return p - dot(p-x0, n0)*n0
end

function inv3(P::Matrix)
    n, m = size(P)
    @assert n == m == 3
    a, b, c, d, e_, f, g, h, i = P
    A = e_*i - f*h
    B = -d*i + f*g
    C = d*h - e_*g
    D = -b*i + c*h
    E = a*i - c*g
    F = -a*h + b*g
    G = b*f - c*e_
    H = -a*f + c*d
    I_ = a*e_ - b*d
    return 1/(a*A + b*B + c*C)*[A B C; D E F; G H I_]
end

"""
    project_from_plane_to_surface(Val{:Tri3}, p, n, x1, x2, x3)

Project vertex `p` to surface of Tri3 element.

# Example
```jldoctest
p = [1/3, 1/3, 0.0]
n = [0.0, 0.0, 1.0]
x1 = [0.0, 0.0, 1.0]
x2 = [1.0, 0.0, 1.0]
x3 = [0.0, 1.0, 1.0]
theta, d = project_from_plane_to_surface(Val{:Tri3}, p, n, x1, x2, x3)
round.(theta, 3), d

# output

([0.333, 0.333], 1.0)
```
"""
function project_from_plane_to_surface(::Type{Val{:Tri3}}, p, n, x1, x2, x3)
    A = [x1-x2 x1-x3 n]
    b = x1-p
    x = inv3(A)*b
    return x[1:2], x[3]
end
