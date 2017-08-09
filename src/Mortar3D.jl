# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

module Mortar3D
include("calculate_normals.jl")
include("calculate_projections.jl")
include("calculate_polygon_clip.jl")
end
