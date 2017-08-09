# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

using Base.Test

using Mortar3D: approx_in,
                is_vertex_inside_polygon,
                calculate_polygon_clip

@testset "approx in" begin
    P = Vector[[1.0, 1.0], [2.0, 2.0]]
    q1 = [1.0, 1.0] + eps(Float64)
    q2 = [1.0, 1.0] + 0.1
    @test approx_in(q1, P)
    @test !approx_in(q2, P)
end

@testset "vertex inside polygon" begin
    P = Vector[[0.0, 0.0, 0.0], [1.0, 0.0, 0.0], [0.0, 1.0, 0.0]]
    q1 = [ 0.1, 0.1, 0.0]
    q2 = [-0.1, 0.1, 0.0]
    @test is_vertex_inside_polygon(q1, P) == true
    @test is_vertex_inside_polygon(q2, P) == false
end

@testset "calculate polygon clip general case" begin
    xs = Vector[[0, 0, 0], [1, 0, 0], [0, 1, 0]]
    xm = Vector[[-1/4, 1/2, 0], [1/2, -1/4, 0], [3/4, 3/4, 0]]
    n = [0, 0, 1]
    P = calculate_polygon_clip(xs, xm, n)
    @test isapprox(P[6], [7/20, 13/20, 0])
    @test isapprox(P[5], [0, 9/16, 0])
    @test isapprox(P[4], [0, 1/4, 0])
    @test isapprox(P[3], [1/4, 0, 0])
    @test isapprox(P[2], [9/16, 0, 0])
    @test isapprox(P[1], [13/20, 7/20, 0])
end

@testset "calculate polygon clip, master node inside slave" begin
    xs = Vector[[0.0,0.0,0.0], [1.0,0.0,0.0], [0.0,1.0,0.0]]
    xm = Vector[[0.0,-0.9,0.0], [0.5,0.1,0.0], [1.0,-0.9,0.0]]
    n = [0.0, 0.0, 1.0]
    P = calculate_polygon_clip(xs, xm, n)
    @test length(P) == 3
end

@testset "calculate polygon clip, slave node inside master" begin
    xm = Vector[[0.0,0.0,0.0], [1.0,0.0,0.0], [0.0,1.0,0.0]]
    xs = Vector[[0.0,-0.9,0.0], [0.5,0.1,0.0], [1.0,-0.9,0.0]]
    n = [0.0, 0.0, 1.0]
    P = calculate_polygon_clip(xs, xm, n)
    @test length(P) == 3
end
