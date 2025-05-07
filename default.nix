{ pkgs ? import <nixpkgs> {}, }:
pkgs.buildNpmPackage rec {
  pname = "discord-desktop-mobile";
  version = "1.3.0";
  hash = pkgs.lib.fakeHash;
  src = ./.;

  npmDepsHash = "sha256-hPAUqObi+GQkyXc6mX9bK/WcGB0QFf0q3EN93+4Q1OE=";

  dontNpmBuild = true;
  nativeBuildInputs = [
    pkgs.electron
  ];

  env = {
    ELECTRON_SKIP_BINARY_DOWNLOAD = 1;
  };
  
  # The node_modules/XXX is such that XXX is the "name" in package.json
  # The path might differ, for instance in electron-forge you need build/main/main.js
  postInstall = ''
    makeWrapper ${pkgs.electron}/bin/electron $out/bin/${pname} \
      --add-flags $out/lib/node_modules/${pname}/main.js
  '';

}
