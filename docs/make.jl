# This file is a part of JuliaFEM.
# License is MIT: see https://github.com/JuliaFEM/Mortar3D.jl/blob/master/LICENSE

using Documenter, Mortar3D

makedocs(modules=[Mortar3D],
         format = :html,
         sitename = "Mortar3D",
         pages = [
                  "Introduction" => "index.md",
                  "Theory" => "theory.md",
                  "API" => "api.md"
                 ])
