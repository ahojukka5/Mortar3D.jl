# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

using Base.Test
using Mortar3D: project_from_surface_to_plane, project_from_plane_to_surface

@testset "project from surface to plane" begin
    p = [1.0, 1.0, 3.0]
    x0 = [0.0, 0.0, 0.0]
    n0 = [0.0, 0.0, 1.0]
    p_proj = project_from_surface_to_plane(p, x0, n0)
    @test isapprox(p_proj, [1.0, 1.0, 0.0])
end

@testset "project from plane to Tri3 surface" begin
    p = [1/3, 1/3, 0.0]
    n = [0.0, 0.0, 1.0]
    x1 = [0.0, 0.0, 1.0]
    x2 = [1.0, 0.0, 1.0]
    x3 = [0.0, 1.0, 1.0]
    theta, d = project_from_plane_to_surface(Val{:Tri3}, p, n, x1, x2, x3)
    @test isapprox(theta, [1/3, 1/3])
    @test isapprox(d, 1.0)
end
