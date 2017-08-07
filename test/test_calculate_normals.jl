# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

using Base.Test
using Mortar3D: calculate_normals

@testset "calculate normals" begin
    X = Dict(1 => [0.0, 0.0, 0.0], 2 => [1.0, 0.0, 0.0], 3 => [0.0, 1.0, 0.0])
    elements = Dict(1 => [1, 2, 3])
    element_types = Dict(1 => :Tri3)
    normals = calculate_normals(elements, element_types, X)
    @test isapprox(normals[1], [0.0, 0.0, 1.0])
end
