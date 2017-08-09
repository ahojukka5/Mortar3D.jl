# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

"""
    approx_in(q, P)

Test does vector `P` contain approximately `q`. This function uses isapprox()
internally to make boolean test.

# Example

```jldoctest
P = Vector[[1.0, 1.0], [2.0, 2.0]]
q = [1.0, 1.0] + eps(Float64)
in(q, P), approx_in(q, P)

# output

(false, true)
```
"""
function approx_in(q, P; rtol=1.0e-9, atol=1.0e-9)
    for p in P
        if isapprox(q, p; rtol=rtol, atol=atol)
            return true
        end
    end
    return false
end

"""
    is_vertex_inside_polygon(q, P; atol=1.0e-3)

Test is vertex `q` inside polygon `P` with given tolerance.

# Example

```jldoctest
P = Vector[[0.0,0.0,0.0], [1.0,0.0,0.0], [0.0,1.0,0.0]]
q1 = [ 0.1, 0.0, 0.0]
q2 = [-0.1, 0.1, 0.0]
is_vertex_inside_polygon(q1, P), is_vertex_inside_polygon(q2, P)

# output

(true, false)

```
"""
function is_vertex_inside_polygon(q, P; atol=1.0e-3)
    N = length(P)
    a = 0.0
    for i=1:N
        A = P[i] - q
        B = P[mod(i,N)+1] - q
        c = norm(A)*norm(B)
        isapprox(c, 0.0; atol=atol) && return true
        cosa = dot(A,B)/c
        isapprox(cosa, 1.0; atol=atol) && return false
        isapprox(cosa, -1.0; atol=atol) && return true
        a += acos(cosa)
    end
    return isapprox(a, 2*pi; atol=atol)
end

"""
    check_orientation!(P, n)

Given polygon `P` and normal direction `n`, ensure that polygon vertices are
ordered in counter clock wise direction with respect to surface normal. It is
assumed that polygon is convex.

# Example

Unit triangle, normal in z-direction:

```jldoctest
P = Vector[[0.0, 0.0, 0.0], [0.0, 1.0, 0.0], [1.0, 0.0, 0.0]]
n = [0.0, 0.0, 1.0]
check_orientation!(P, n)

# output

3-element Array{Array{T,1} where T,1}:
 [1.0, 0.0, 0.0]
 [0.0, 0.0, 0.0]
 [0.0, 1.0, 0.0]
```
"""
function check_orientation!(P, n)
    C = mean(P)
    np = length(P)
    s = [dot(n, cross(P[i]-C, P[mod(i+1,np)+1]-C)) for i=1:np]
    all(s .< 0) && return
    # debug("polygon not in ccw order, fixing")
    # project points to new orthogonal basis Q and sort there
    t1 = (P[1]-C)/norm(P[1]-C)
    t2 = cross(n, t1)
    Q = [n t1 t2]
    sort!(P, lt=(A, B) -> begin
        A_proj = Q'*(A-C)
        B_proj = Q'*(B-C)
        a = atan2(A_proj[3], A_proj[2])
        b = atan2(B_proj[3], B_proj[2])
        return a > b
    end)
    return P
end

"""
    calculate_polygon_clip(xs, xm, n)

Given two polygons `xs` and `xm`, calculate polygon clipping `P`. It is
assumed that clipping is done in direction `n`.

# Example

```jldoctest
xs = Vector[[0, 0, 0], [1, 0, 0], [0, 1, 0]]
xm = Vector[[-1/4, 1/2, 0], [1/2, -1/4, 0], [3/4, 3/4, 0]]
n = [0, 0, 1]
P = calculate_polygon_clip(xs, xm, n)

# output

6-element Array{Array{T,1} where T,1}:
 [0.65, 0.35, 0.0]
 [0.5625, 0.0, 0.0]
 [0.25, 0.0, 0.0]
 [0.0, 0.25, 0.0]
 [0.0, 0.5625, 0.0]
 [0.35, 0.65, 0.0]

```
"""
function calculate_polygon_clip{T}(xs::Vector{T}, xm::Vector{T}, n::T)
    # objective: search does line xm1 - xm2 clip xs
    nm = length(xm)
    ns = length(xs)
    P = T[]

    # 1. test is master point inside slave, if yes, add to clip
    for i=1:nm
        if is_vertex_inside_polygon(xm[i], xs)
            push!(P, xm[i])
        end
    end

    # 2. test is slave point inside master, if yes, add to clip
    for i=1:ns
        # FIXME: point of this?
        # approx_in(xs[i], P) && continue
        if is_vertex_inside_polygon(xs[i], xm)
            push!(P, xs[i])
        end
    end

    for i=1:nm
        # 2. find possible intersection
        xm1 = xm[i]
        xm2 = xm[mod(i,nm)+1]
        for j=1:ns
            xs1 = xs[j]
            xs2 = xs[mod(j,ns)+1]
            tnom = dot(cross(xm1-xs1, xm2-xm1), n)
            tdenom = dot(cross(xs2-xs1, xm2-xm1), n)
            isapprox(tdenom, 0) && continue
            t = tnom/tdenom
            (0 <= t <= 1) || continue
            q = xs1 + t*(xs2 - xs1)
            # FIXME: point of this?
            # if approx_in(q, P)
            #     continue
            # end
            if is_vertex_inside_polygon(q, xm)
                push!(P, q)
            end
        end
    end
    check_orientation!(P, n)
    return P
end
