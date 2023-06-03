import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import $ from "jquery";
import grapesjsBlockBootstrap from "grapesjs-blocks-bootstrap4";
import grapesjsPluginExport from "grapesjs-plugin-export";
import grapesjsStyleBg from "grapesjs-style-bg";

import {
  addEditorCommand,
  deviceManager,
  layerManager,
  panels,
  scripts,
  selectorManager,
  storageSetting,
  AssetManager,
  styleManager,
  styles,
  toggleSidebar,
  traitManager,
} from "./geditor_utils";
import tailwindComponent from "../plugins/tailwind";
import swiperComponent from "../plugins/swiper";
import chartLibComponent from "../plugins/charts";

const geditorConfig = (assets, pageId) => {
  $(".panel__devices").html("");
  $(".panel__basic-actions").html("");
  $(".panel__editor").html("");
  $("#blocks").html("");
  $("#styles-container").html("");
  $("#layers-container").html("");
  $("#trait-container").html("");

  // Content for Preview
  const navbar = $("#navbar");
  const mainContent = $("#main-content");
  const panelTopBar = $("#main-content > .navbar-light");

  const editor = grapesjs.init({
    container: "#editor",
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: styleManager,
    layerManager: layerManager,
    traitManager: traitManager,
    selectorManager: selectorManager,
    panels: panels,
    deviceManager: deviceManager,
    assetManager: {
      select: true,
      // You can pass components as a JSON instead of a simple HTML string,
      // in this case we also use a defined component type `image`
      content: { type: "image" },
      // This triggers `active` event on dropped components and the `image`
      // reacts by opening the AssetManager
      activate: true,
      upload: 'https://endpoint/upload/assets',

    // The name used in POST to pass uploaded files, default: `'files'`
    uploadName: 'files',
      assets: [
       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWt2T5sERw6pJd5NJMB9NeET0VeCO0vVnsg&usqp=CAU',
       // Pass an object with your properties
       {
         type: 'image',
         src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7qAsIK1KYOG-aBuHXU3jjmt-fhj64QdQsNQ&usqp=CAU',
         height: 350,
         width: 250,
         name: 'displayName'
       },
       {
         // As the 'image' is the base type of assets, omitting it will
         // be set as `image` by default
         src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNNl92qNwzhP_M2qyyq78DG2GPMokRD1WfmA&usqp=CAU',
         height: 350,
         width: 250,
         name: 'displayName'
       },
      ],
    },
    storageManager: storageSetting(pageId),
    canvas: {
      styles: styles,
      scripts: scripts,
    },
    
    plugins: [
      tailwindComponent,
      gjsBlockBasic,
      swiperComponent,
      grapesjsBlockBootstrap,
      grapesjsPluginExport,
      grapesjsStyleBg,
      chartLibComponent,
    ],
    pluginsOpts: {
      tailwindComponent: {},
      gjsBlockBasic: {},
      swiperComponent: {},
      grapesjsBlockBootstrap: {},
      grapesjsPluginExport: {},
      grapesjsStyleBg: {},
      chartLibComponent: {},
    },
  });

  addEditorCommand(editor);
  editor.on("run:preview", () => {
    console.log("It will trigger when we click on preview icon");
    // This will be used to hide border
    editor.stopCommand("sw-visibility");
    // This will hide the sidebar view
    navbar.removeClass("sidebar");
    // This will make the main-content to be full width
    mainContent.removeClass("main-content");

    // This will hide top panel where we have added the button
    panelTopBar.addClass("d-none");
  });
  editor.on("stop:preview", () => {
    // This event is reverse of the above event.
    console.log("It will trigger when we click on cancel preview icon");
    editor.runCommand("sw-visibility");
    navbar.addClass("sidebar");
    mainContent.addClass("main-content");
    panelTopBar.removeClass("d-none");
  });
  editor.on("component:selected", (component) => {
    const newTool = {
      icon: "fa fa-plus-square",
      title: "Check Toolbar",
      commandName: "new-tool-cmd",
      id: "new-tool",
    };

    const defaultToolbar = component.get("toolbar");
    const checkAlreadyExist = defaultToolbar.find(
      (toolbar) => toolbar.command === newTool.commandName
    );
    if (!checkAlreadyExist) {
      defaultToolbar.unshift({
        id: newTool.id,
        attributes: { class: newTool.icon, title: newTool.title },
        command: newTool.commandName,
      });
      component.set("toolbar", defaultToolbar);
    }
  });

  setTimeout(() => {
    let categories = editor.BlockManager.getCategories();
    categories.each((category) => category.set("open", false));
  }, 1000);
  return editor;
};

export default geditorConfig;
