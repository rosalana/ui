declare module "virtual:workbench-catalog" {
  const catalog: {
    components: import("./docs/types").ComponentApi[];
    symbols: import("./docs/types").ExportApi[];
  };
  export default catalog;
}
