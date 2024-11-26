/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var COMPILED = !0, goog = goog || {};
goog.global = this || self;
goog.exportPath_ = function($name$$, $object$$, $overwriteImplicit$$, $cur_objectToExportTo$$) {
  $name$$ = $name$$.split(".");
  $cur_objectToExportTo$$ = $cur_objectToExportTo$$ || goog.global;
  $name$$[0] in $cur_objectToExportTo$$ || "undefined" == typeof $cur_objectToExportTo$$.execScript || $cur_objectToExportTo$$.execScript("var " + $name$$[0]);
  for (var $part$$; $name$$.length && ($part$$ = $name$$.shift());) {
    if ($name$$.length || void 0 === $object$$) {
      $cur_objectToExportTo$$ = $cur_objectToExportTo$$[$part$$] && $cur_objectToExportTo$$[$part$$] !== Object.prototype[$part$$] ? $cur_objectToExportTo$$[$part$$] : $cur_objectToExportTo$$[$part$$] = {};
    } else {
      if (!$overwriteImplicit$$ && goog.isObject($object$$) && goog.isObject($cur_objectToExportTo$$[$part$$])) {
        for (var $prop$$ in $object$$) {
          $object$$.hasOwnProperty($prop$$) && ($cur_objectToExportTo$$[$part$$][$prop$$] = $object$$[$prop$$]);
        }
      } else {
        $cur_objectToExportTo$$[$part$$] = $object$$;
      }
    }
  }
};
goog.define = function($name$$, $defaultValue$jscomp$2_value$$) {
  if (!COMPILED) {
    var $uncompiledDefines$$ = goog.global.CLOSURE_UNCOMPILED_DEFINES, $defines$$ = goog.global.CLOSURE_DEFINES;
    $uncompiledDefines$$ && void 0 === $uncompiledDefines$$.nodeType && Object.prototype.hasOwnProperty.call($uncompiledDefines$$, $name$$) ? $defaultValue$jscomp$2_value$$ = $uncompiledDefines$$[$name$$] : $defines$$ && void 0 === $defines$$.nodeType && Object.prototype.hasOwnProperty.call($defines$$, $name$$) && ($defaultValue$jscomp$2_value$$ = $defines$$[$name$$]);
  }
  return $defaultValue$jscomp$2_value$$;
};
goog.FEATURESET_YEAR = 2012;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function($name$$) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.provide cannot be used within a module.");
  }
  if (!COMPILED && goog.isProvided_($name$$)) {
    throw Error('Namespace "' + $name$$ + '" already declared.');
  }
  goog.constructNamespace_($name$$);
};
goog.constructNamespace_ = function($name$$, $object$$, $overwriteImplicit$$) {
  if (!COMPILED) {
    delete goog.implicitNamespaces_[$name$$];
    for (var $namespace$$ = $name$$; ($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
      goog.implicitNamespaces_[$namespace$$] = !0;
    }
  }
  goog.exportPath_($name$$, $object$$, $overwriteImplicit$$);
};
goog.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.getScriptNonce_ = function($doc_nonce_opt_window_script$$) {
  $doc_nonce_opt_window_script$$ = ($doc_nonce_opt_window_script$$ || goog.global).document;
  return ($doc_nonce_opt_window_script$$ = $doc_nonce_opt_window_script$$.querySelector && $doc_nonce_opt_window_script$$.querySelector("script[nonce]")) && ($doc_nonce_opt_window_script$$ = $doc_nonce_opt_window_script$$.nonce || $doc_nonce_opt_window_script$$.getAttribute("nonce")) && goog.NONCE_PATTERN_.test($doc_nonce_opt_window_script$$) ? $doc_nonce_opt_window_script$$ : "";
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function($name$$) {
  if ("string" !== typeof $name$$ || !$name$$ || -1 == $name$$.search(goog.VALID_MODULE_RE_)) {
    throw Error("Invalid module identifier");
  }
  if (!goog.isInGoogModuleLoader_()) {
    throw Error("Module " + $name$$ + " has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
  }
  if (goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module may only be called once per module.");
  }
  goog.moduleLoaderState_.moduleName = $name$$;
  if (!COMPILED) {
    if (goog.isProvided_($name$$)) {
      throw Error('Namespace "' + $name$$ + '" already declared.');
    }
    delete goog.implicitNamespaces_[$name$$];
  }
};
goog.module.get = function($name$$) {
  return goog.module.getInternal_($name$$);
};
goog.module.getInternal_ = function($name$$) {
  if (!COMPILED) {
    if ($name$$ in goog.loadedModules_) {
      return goog.loadedModules_[$name$$].exports;
    }
    if (!goog.implicitNamespaces_[$name$$]) {
      return $name$$ = goog.getObjectByName($name$$), null != $name$$ ? $name$$ : null;
    }
  }
  return null;
};
goog.ModuleType = {ES6:"es6", GOOG:"goog"};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
  return goog.isInGoogModuleLoader_() || goog.isInEs6ModuleLoader_();
};
goog.isInGoogModuleLoader_ = function() {
  return !!goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.GOOG;
};
goog.isInEs6ModuleLoader_ = function() {
  if (goog.moduleLoaderState_ && goog.moduleLoaderState_.type == goog.ModuleType.ES6) {
    return !0;
  }
  var $jscomp$$ = goog.global.$jscomp;
  return $jscomp$$ ? "function" != typeof $jscomp$$.getCurrentModulePath ? !1 : !!$jscomp$$.getCurrentModulePath() : !1;
};
goog.module.declareLegacyNamespace = function() {
  if (!COMPILED && !goog.isInGoogModuleLoader_()) {
    throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
  }
  if (!COMPILED && !goog.moduleLoaderState_.moduleName) {
    throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
  }
  goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.declareModuleId = function($namespace$$) {
  if (!COMPILED) {
    if (!goog.isInEs6ModuleLoader_()) {
      throw Error("goog.declareModuleId may only be called from within an ES6 module");
    }
    if (goog.moduleLoaderState_ && goog.moduleLoaderState_.moduleName) {
      throw Error("goog.declareModuleId may only be called once per module.");
    }
    if ($namespace$$ in goog.loadedModules_) {
      throw Error('Module with namespace "' + $namespace$$ + '" already exists.');
    }
  }
  if (goog.moduleLoaderState_) {
    goog.moduleLoaderState_.moduleName = $namespace$$;
  } else {
    var $exports_jscomp$$ = goog.global.$jscomp;
    if (!$exports_jscomp$$ || "function" != typeof $exports_jscomp$$.getCurrentModulePath) {
      throw Error('Module with namespace "' + $namespace$$ + '" has been loaded incorrectly.');
    }
    $exports_jscomp$$ = $exports_jscomp$$.require($exports_jscomp$$.getCurrentModulePath());
    goog.loadedModules_[$namespace$$] = {exports:$exports_jscomp$$, type:goog.ModuleType.ES6, moduleId:$namespace$$};
  }
};
goog.setTestOnly = function($opt_message$$) {
  if (goog.DISALLOW_TEST_ONLY_CODE) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + ($opt_message$$ ? ": " + $opt_message$$ : "."));
  }
};
goog.forwardDeclare = function($name$$) {
};
COMPILED || (goog.isProvided_ = function($name$$) {
  return $name$$ in goog.loadedModules_ || !goog.implicitNamespaces_[$name$$] && null != goog.getObjectByName($name$$);
}, goog.implicitNamespaces_ = {"goog.module":!0});
goog.getObjectByName = function($name$jscomp$83_parts$$, $cur$$) {
  $name$jscomp$83_parts$$ = $name$jscomp$83_parts$$.split(".");
  $cur$$ = $cur$$ || goog.global;
  for (var $i$$ = 0; $i$$ < $name$jscomp$83_parts$$.length; $i$$++) {
    if ($cur$$ = $cur$$[$name$jscomp$83_parts$$[$i$$]], null == $cur$$) {
      return null;
    }
  }
  return $cur$$;
};
goog.addDependency = function($relPath$$, $provides$$, $requires$$, $opt_loadFlags$$) {
  !COMPILED && goog.DEPENDENCIES_ENABLED && goog.debugLoader_.addDependency($relPath$$, $provides$$, $requires$$, $opt_loadFlags$$);
};
goog.ENABLE_DEBUG_LOADER = !1;
goog.logToConsole_ = function($msg$$) {
  goog.global.console && goog.global.console.error($msg$$);
};
goog.require = function($namespace$$) {
  if (!COMPILED) {
    goog.ENABLE_DEBUG_LOADER && goog.debugLoader_.requested($namespace$$);
    if (goog.isProvided_($namespace$$)) {
      if (goog.isInModuleLoader_()) {
        return goog.module.getInternal_($namespace$$);
      }
    } else if (goog.ENABLE_DEBUG_LOADER) {
      var $moduleLoaderState$$ = goog.moduleLoaderState_;
      goog.moduleLoaderState_ = null;
      try {
        goog.debugLoader_.load_($namespace$$);
      } finally {
        goog.moduleLoaderState_ = $moduleLoaderState$$;
      }
    }
    return null;
  }
};
goog.requireType = function($namespace$$) {
  return {};
};
goog.basePath = "";
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function($ctor$$) {
  $ctor$$.instance_ = void 0;
  $ctor$$.getInstance = function() {
    if ($ctor$$.instance_) {
      return $ctor$$.instance_;
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
    return $ctor$$.instance_ = new $ctor$$();
  };
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.TRANSPILE = "detect";
goog.ASSUME_ES_MODULES_TRANSPILED = !1;
goog.TRUSTED_TYPES_POLICY_NAME = "goog";
goog.hasBadLetScoping = null;
goog.loadModule = function($moduleDef$$) {
  var $previousState$$ = goog.moduleLoaderState_;
  try {
    goog.moduleLoaderState_ = {moduleName:"", declareLegacyNamespace:!1, type:goog.ModuleType.GOOG};
    var $origExports$$ = {}, $exports$$ = $origExports$$;
    if ("function" === typeof $moduleDef$$) {
      $exports$$ = $moduleDef$$.call(void 0, $exports$$);
    } else if ("string" === typeof $moduleDef$$) {
      $exports$$ = goog.loadModuleFromSource_.call(void 0, $exports$$, $moduleDef$$);
    } else {
      throw Error("Invalid module definition");
    }
    var $moduleName$$ = goog.moduleLoaderState_.moduleName;
    if ("string" === typeof $moduleName$$ && $moduleName$$) {
      goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_($moduleName$$, $exports$$, $origExports$$ !== $exports$$) : goog.SEAL_MODULE_EXPORTS && Object.seal && "object" == typeof $exports$$ && null != $exports$$ && Object.seal($exports$$), goog.loadedModules_[$moduleName$$] = {exports:$exports$$, type:goog.ModuleType.GOOG, moduleId:goog.moduleLoaderState_.moduleName};
    } else {
      throw Error('Invalid module name "' + $moduleName$$ + '"');
    }
  } finally {
    goog.moduleLoaderState_ = $previousState$$;
  }
};
goog.loadModuleFromSource_ = function($exports$$, $JSCompiler_OptimizeArgumentsArray_p0$$) {
  eval(goog.CLOSURE_EVAL_PREFILTER_.createScript($JSCompiler_OptimizeArgumentsArray_p0$$));
  return $exports$$;
};
goog.normalizePath_ = function($components_path$$) {
  $components_path$$ = $components_path$$.split("/");
  for (var $i$$ = 0; $i$$ < $components_path$$.length;) {
    "." == $components_path$$[$i$$] ? $components_path$$.splice($i$$, 1) : $i$$ && ".." == $components_path$$[$i$$] && $components_path$$[$i$$ - 1] && ".." != $components_path$$[$i$$ - 1] ? $components_path$$.splice(--$i$$, 2) : $i$$++;
  }
  return $components_path$$.join("/");
};
goog.loadFileSync_ = function($src$$) {
  if (goog.global.CLOSURE_LOAD_FILE_SYNC) {
    return goog.global.CLOSURE_LOAD_FILE_SYNC($src$$);
  }
  try {
    var $xhr$$ = new goog.global.XMLHttpRequest();
    $xhr$$.open("get", $src$$, !1);
    $xhr$$.send();
    return 0 == $xhr$$.status || 200 == $xhr$$.status ? $xhr$$.responseText : null;
  } catch ($err$$) {
    return null;
  }
};
goog.typeOf = function($value$$) {
  var $s$$ = typeof $value$$;
  return "object" != $s$$ ? $s$$ : $value$$ ? Array.isArray($value$$) ? "array" : $s$$ : "null";
};
goog.isArrayLike = function($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return "array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length;
};
goog.isDateLike = function($val$$) {
  return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear;
};
goog.isObject = function($val$$) {
  var $type$$ = typeof $val$$;
  return "object" == $type$$ && null != $val$$ || "function" == $type$$;
};
goog.getUid = function($obj$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, goog.UID_PROPERTY_) && $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function($obj$$) {
  return !!$obj$$[goog.UID_PROPERTY_];
};
goog.removeUid = function($obj$$) {
  null !== $obj$$ && "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_];
  } catch ($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.cloneObject = function($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if ("object" == $clone_type$$ || "array" == $clone_type$$) {
    if ("function" === typeof $obj$$.clone) {
      return $obj$$.clone();
    }
    if ("undefined" !== typeof Map && $obj$$ instanceof Map) {
      return new Map($obj$$);
    }
    if ("undefined" !== typeof Set && $obj$$ instanceof Set) {
      return new Set($obj$$);
    }
    $clone_type$$ = "array" == $clone_type$$ ? [] : {};
    for (var $key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$]);
    }
    return $clone_type$$;
  }
  return $obj$$;
};
goog.bindNative_ = function($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments);
};
goog.bindJs_ = function($fn$$, $selfObj$$, $var_args$$) {
  if (!$fn$$) {
    throw Error();
  }
  if (2 < arguments.length) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $newArgs$$);
    };
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments);
  };
};
goog.bind = function($fn$$, $selfObj$$, $var_args$$) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
  return goog.bind.apply(null, arguments);
};
goog.partial = function($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$ = $args$$.slice();
    $newArgs$$.push.apply($newArgs$$, arguments);
    return $fn$$.apply(this, $newArgs$$);
  };
};
goog.now = function() {
  return Date.now();
};
goog.globalEval = function($script$$) {
  (0,eval)($script$$);
};
goog.getCssName = function($className_result$$, $opt_modifier$$) {
  if ("." == String($className_result$$).charAt(0)) {
    throw Error('className passed in goog.getCssName must not start with ".". You passed: ' + $className_result$$);
  }
  var $getMapping$$ = function($cssName$$) {
    return goog.cssNameMapping_[$cssName$$] || $cssName$$;
  }, $rename_renameByParts$$ = function($cssName$jscomp$1_parts$$) {
    $cssName$jscomp$1_parts$$ = $cssName$jscomp$1_parts$$.split("-");
    for (var $mapped$$ = [], $i$$ = 0; $i$$ < $cssName$jscomp$1_parts$$.length; $i$$++) {
      $mapped$$.push($getMapping$$($cssName$jscomp$1_parts$$[$i$$]));
    }
    return $mapped$$.join("-");
  };
  $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
    return $a$$;
  };
  $className_result$$ = $opt_modifier$$ ? $className_result$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className_result$$);
  return goog.global.CLOSURE_CSS_NAME_MAP_FN ? goog.global.CLOSURE_CSS_NAME_MAP_FN($className_result$$) : $className_result$$;
};
goog.setCssNameMapping = function($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.GetMsgOptions = function() {
};
goog.getMsg = function($str$$, $opt_values$$, $opt_options$$) {
  $opt_options$$ && $opt_options$$.html && ($str$$ = $str$$.replace(/</g, "&lt;"));
  $opt_options$$ && $opt_options$$.unescapeHtmlEntities && ($str$$ = $str$$.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
  $opt_values$$ && ($str$$ = $str$$.replace(/\{\$([^}]+)}/g, function($match$$, $key$$) {
    return null != $opt_values$$ && $key$$ in $opt_values$$ ? $opt_values$$[$key$$] : $match$$;
  }));
  return $str$$;
};
goog.getMsgWithFallback = function($a$$, $b$$) {
  return $a$$;
};
goog.exportSymbol = function($publicPath$$, $object$$, $objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, !0, $objectToExportTo$$);
};
goog.exportProperty = function($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$;
};
goog.inherits = function($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$();
  $childCtor$$.prototype.constructor = $childCtor$$;
  $childCtor$$.base = function($me$$, $methodName$$, $var_args$$) {
    for (var $args$$ = Array(arguments.length - 2), $i$$ = 2; $i$$ < arguments.length; $i$$++) {
      $args$$[$i$$ - 2] = arguments[$i$$];
    }
    return $parentCtor$$.prototype[$methodName$$].apply($me$$, $args$$);
  };
};
goog.scope = function($fn$$) {
  if (goog.isInModuleLoader_()) {
    throw Error("goog.scope is not supported within a module.");
  }
  $fn$$.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function($superClass$$, $def$$) {
  var $cls_constructor$$ = $def$$.constructor, $statics$$ = $def$$.statics;
  $cls_constructor$$ && $cls_constructor$$ != Object.prototype.constructor || ($cls_constructor$$ = function() {
    throw Error("cannot instantiate an interface (no constructor defined).");
  });
  $cls_constructor$$ = goog.defineClass.createSealingConstructor_($cls_constructor$$, $superClass$$);
  $superClass$$ && goog.inherits($cls_constructor$$, $superClass$$);
  delete $def$$.constructor;
  delete $def$$.statics;
  goog.defineClass.applyProperties_($cls_constructor$$.prototype, $def$$);
  null != $statics$$ && ($statics$$ instanceof Function ? $statics$$($cls_constructor$$) : goog.defineClass.applyProperties_($cls_constructor$$, $statics$$));
  return $cls_constructor$$;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function($ctr$$, $superClass$$) {
  return goog.defineClass.SEAL_CLASS_INSTANCES ? function() {
    var $instance$$ = $ctr$$.apply(this, arguments) || this;
    $instance$$[goog.UID_PROPERTY_] = $instance$$[goog.UID_PROPERTY_];
    return $instance$$;
  } : $ctr$$;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function($target$$, $source$$) {
  for (var $key$$ in $source$$) {
    Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
  }
  for (var $i$$ = 0; $i$$ < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; $i$$++) {
    $key$$ = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[$i$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
  }
};
goog.identity_ = function($s$$) {
  return $s$$;
};
goog.createTrustedTypesPolicy = function($name$$) {
  var $policy$$ = null, $policyFactory$$ = goog.global.trustedTypes;
  if (!$policyFactory$$ || !$policyFactory$$.createPolicy) {
    return $policy$$;
  }
  try {
    $policy$$ = $policyFactory$$.createPolicy($name$$, {createHTML:goog.identity_, createScript:goog.identity_, createScriptURL:goog.identity_});
  } catch ($e$$) {
    goog.logToConsole_($e$$.message);
  }
  return $policy$$;
};
!COMPILED && goog.DEPENDENCIES_ENABLED && (goog.isEdge_ = function() {
  return !!(goog.global.navigator && goog.global.navigator.userAgent ? goog.global.navigator.userAgent : "").match(/Edge\/(\d+)(\.\d)*/i);
}, goog.inHtmlDocument_ = function() {
  var $doc$$ = goog.global.document;
  return null != $doc$$ && "write" in $doc$$;
}, goog.isDocumentLoading_ = function() {
  var $doc$$ = goog.global.document;
  return $doc$$.attachEvent ? "complete" != $doc$$.readyState : "loading" == $doc$$.readyState;
}, goog.findBasePath_ = function() {
  if (void 0 != goog.global.CLOSURE_BASE_PATH && "string" === typeof goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH;
  } else if (goog.inHtmlDocument_()) {
    var $doc$$ = goog.global.document, $currentScript_i$$ = $doc$$.currentScript;
    $doc$$ = $currentScript_i$$ ? [$currentScript_i$$] : $doc$$.getElementsByTagName("SCRIPT");
    for ($currentScript_i$$ = $doc$$.length - 1; 0 <= $currentScript_i$$; --$currentScript_i$$) {
      var $src$$ = $doc$$[$currentScript_i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?");
      $l_qmark$$ = -1 == $l_qmark$$ ? $src$$.length : $l_qmark$$;
      if ("base.js" == $src$$.slice($l_qmark$$ - 7, $l_qmark$$)) {
        goog.basePath = $src$$.slice(0, $l_qmark$$ - 7);
        break;
      }
    }
  }
}, goog.findBasePath_(), goog.protectScriptTag_ = function($str$$) {
  return $str$$.replace(/<\/(SCRIPT)/ig, "\\x3c/$1");
}, goog.DebugLoader_ = function() {
  this.dependencies_ = {};
  this.idToPath_ = {};
  this.written_ = {};
  this.loadingDeps_ = [];
  this.depsToLoad_ = [];
  this.paused_ = !1;
  this.factory_ = new goog.DependencyFactory();
  this.deferredCallbacks_ = {};
  this.deferredQueue_ = [];
}, goog.DebugLoader_.prototype.bootstrap = function($namespaces$$, $callback$$) {
  function $resolve$$() {
    $cb$$ && (goog.global.setTimeout($cb$$, 0), $cb$$ = null);
  }
  var $cb$$ = $callback$$;
  if ($namespaces$$.length) {
    $callback$$ = [];
    for (var $i$$ = 0; $i$$ < $namespaces$$.length; $i$$++) {
      var $path$$ = this.getPathFromDeps_($namespaces$$[$i$$]);
      if (!$path$$) {
        throw Error("Unregonized namespace: " + $namespaces$$[$i$$]);
      }
      $callback$$.push(this.dependencies_[$path$$]);
    }
    $path$$ = goog.require;
    var $loaded$$ = 0;
    for ($i$$ = 0; $i$$ < $namespaces$$.length; $i$$++) {
      $path$$($namespaces$$[$i$$]), $callback$$[$i$$].onLoad(function() {
        ++$loaded$$ == $namespaces$$.length && $resolve$$();
      });
    }
  } else {
    $resolve$$();
  }
}, goog.DebugLoader_.prototype.loadClosureDeps = function() {
  this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath + "deps.js"), "deps.js", [], [], {}));
  this.loadDeps_();
}, goog.DebugLoader_.prototype.requested = function($absPathOrId_path$$, $callback$jscomp$60_opt_force$$) {
  ($absPathOrId_path$$ = this.getPathFromDeps_($absPathOrId_path$$)) && ($callback$jscomp$60_opt_force$$ || this.areDepsLoaded_(this.dependencies_[$absPathOrId_path$$].requires)) && ($callback$jscomp$60_opt_force$$ = this.deferredCallbacks_[$absPathOrId_path$$]) && (delete this.deferredCallbacks_[$absPathOrId_path$$], $callback$jscomp$60_opt_force$$());
}, goog.DebugLoader_.prototype.setDependencyFactory = function($factory$$) {
  this.factory_ = $factory$$;
}, goog.DebugLoader_.prototype.load_ = function($namespace$$) {
  if (this.getPathFromDeps_($namespace$$)) {
    var $loader$$ = this, $deps$$ = [], $visit$$ = function($dep_namespace$$) {
      var $i$jscomp$10_path$$ = $loader$$.getPathFromDeps_($dep_namespace$$);
      if (!$i$jscomp$10_path$$) {
        throw Error("Bad dependency path or symbol: " + $dep_namespace$$);
      }
      if (!$loader$$.written_[$i$jscomp$10_path$$]) {
        $loader$$.written_[$i$jscomp$10_path$$] = !0;
        $dep_namespace$$ = $loader$$.dependencies_[$i$jscomp$10_path$$];
        for ($i$jscomp$10_path$$ = 0; $i$jscomp$10_path$$ < $dep_namespace$$.requires.length; $i$jscomp$10_path$$++) {
          goog.isProvided_($dep_namespace$$.requires[$i$jscomp$10_path$$]) || $visit$$($dep_namespace$$.requires[$i$jscomp$10_path$$]);
        }
        $deps$$.push($dep_namespace$$);
      }
    };
    $visit$$($namespace$$);
    $namespace$$ = !!this.depsToLoad_.length;
    this.depsToLoad_ = this.depsToLoad_.concat($deps$$);
    this.paused_ || $namespace$$ || this.loadDeps_();
  } else {
    goog.logToConsole_("goog.require could not find: " + $namespace$$);
  }
}, goog.DebugLoader_.prototype.loadDeps_ = function() {
  for (var $loader$$ = this, $paused$$ = this.paused_; this.depsToLoad_.length && !$paused$$;) {
    (function() {
      var $loadCallDone$$ = !1, $dep$$ = $loader$$.depsToLoad_.shift(), $loaded$$ = !1;
      $loader$$.loading_($dep$$);
      var $controller$$ = {pause:function() {
        if ($loadCallDone$$) {
          throw Error("Cannot call pause after the call to load.");
        }
        $paused$$ = !0;
      }, resume:function() {
        $loadCallDone$$ ? $loader$$.resume_() : $paused$$ = !1;
      }, loaded:function() {
        if ($loaded$$) {
          throw Error("Double call to loaded.");
        }
        $loaded$$ = !0;
        $loader$$.loaded_($dep$$);
      }, pending:function() {
        for (var $pending$$ = [], $i$$ = 0; $i$$ < $loader$$.loadingDeps_.length; $i$$++) {
          $pending$$.push($loader$$.loadingDeps_[$i$$]);
        }
        return $pending$$;
      }, setModuleState:function($type$$) {
        goog.moduleLoaderState_ = {type:$type$$, moduleName:"", declareLegacyNamespace:!1};
      }, registerEs6ModuleExports:function($path$$, $exports$$, $opt_closureNamespace$$) {
        $opt_closureNamespace$$ && (goog.loadedModules_[$opt_closureNamespace$$] = {exports:$exports$$, type:goog.ModuleType.ES6, moduleId:$opt_closureNamespace$$ || ""});
      }, registerGoogModuleExports:function($moduleId$$, $exports$$) {
        goog.loadedModules_[$moduleId$$] = {exports:$exports$$, type:goog.ModuleType.GOOG, moduleId:$moduleId$$};
      }, clearModuleState:function() {
        goog.moduleLoaderState_ = null;
      }, defer:function($callback$$) {
        if ($loadCallDone$$) {
          throw Error("Cannot register with defer after the call to load.");
        }
        $loader$$.defer_($dep$$, $callback$$);
      }, areDepsLoaded:function() {
        return $loader$$.areDepsLoaded_($dep$$.requires);
      }};
      try {
        $dep$$.load($controller$$);
      } finally {
        $loadCallDone$$ = !0;
      }
    })();
  }
  $paused$$ && this.pause_();
}, goog.DebugLoader_.prototype.pause_ = function() {
  this.paused_ = !0;
}, goog.DebugLoader_.prototype.resume_ = function() {
  this.paused_ && (this.paused_ = !1, this.loadDeps_());
}, goog.DebugLoader_.prototype.loading_ = function($dep$$) {
  this.loadingDeps_.push($dep$$);
}, goog.DebugLoader_.prototype.loaded_ = function($dep$$) {
  for (var $i$$ = 0; $i$$ < this.loadingDeps_.length; $i$$++) {
    if (this.loadingDeps_[$i$$] == $dep$$) {
      this.loadingDeps_.splice($i$$, 1);
      break;
    }
  }
  for ($i$$ = 0; $i$$ < this.deferredQueue_.length; $i$$++) {
    if (this.deferredQueue_[$i$$] == $dep$$.path) {
      this.deferredQueue_.splice($i$$, 1);
      break;
    }
  }
  if (this.loadingDeps_.length == this.deferredQueue_.length && !this.depsToLoad_.length) {
    for (; this.deferredQueue_.length;) {
      this.requested(this.deferredQueue_.shift(), !0);
    }
  }
  $dep$$.loaded();
}, goog.DebugLoader_.prototype.areDepsLoaded_ = function($pathsOrIds$$) {
  for (var $i$$ = 0; $i$$ < $pathsOrIds$$.length; $i$$++) {
    var $path$$ = this.getPathFromDeps_($pathsOrIds$$[$i$$]);
    if (!$path$$ || !($path$$ in this.deferredCallbacks_ || goog.isProvided_($pathsOrIds$$[$i$$]))) {
      return !1;
    }
  }
  return !0;
}, goog.DebugLoader_.prototype.getPathFromDeps_ = function($absPathOrId$$) {
  return $absPathOrId$$ in this.idToPath_ ? this.idToPath_[$absPathOrId$$] : $absPathOrId$$ in this.dependencies_ ? $absPathOrId$$ : null;
}, goog.DebugLoader_.prototype.defer_ = function($dependency$$, $callback$$) {
  this.deferredCallbacks_[$dependency$$.path] = $callback$$;
  this.deferredQueue_.push($dependency$$.path);
}, goog.LoadController = function() {
}, goog.LoadController.prototype.pause = function() {
}, goog.LoadController.prototype.resume = function() {
}, goog.LoadController.prototype.loaded = function() {
}, goog.LoadController.prototype.pending = function() {
}, goog.LoadController.prototype.registerEs6ModuleExports = function($path$$, $exports$$, $opt_closureNamespace$$) {
}, goog.LoadController.prototype.setModuleState = function($type$$) {
}, goog.LoadController.prototype.clearModuleState = function() {
}, goog.LoadController.prototype.defer = function($callback$$) {
}, goog.LoadController.prototype.areDepsLoaded = function() {
}, goog.Dependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  this.path = $path$$;
  this.relativePath = $relativePath$$;
  this.provides = $provides$$;
  this.requires = $requires$$;
  this.loadFlags = $loadFlags$$;
  this.loaded_ = !1;
  this.loadCallbacks_ = [];
}, goog.Dependency.prototype.getPathName = function() {
  var $pathName$$ = this.path, $protocolIndex_slashIndex$$ = $pathName$$.indexOf("://");
  0 <= $protocolIndex_slashIndex$$ && ($pathName$$ = $pathName$$.substring($protocolIndex_slashIndex$$ + 3), $protocolIndex_slashIndex$$ = $pathName$$.indexOf("/"), 0 <= $protocolIndex_slashIndex$$ && ($pathName$$ = $pathName$$.substring($protocolIndex_slashIndex$$ + 1)));
  return $pathName$$;
}, goog.Dependency.prototype.onLoad = function($callback$$) {
  this.loaded_ ? $callback$$() : this.loadCallbacks_.push($callback$$);
}, goog.Dependency.prototype.loaded = function() {
  this.loaded_ = !0;
  var $callbacks$$ = this.loadCallbacks_;
  this.loadCallbacks_ = [];
  for (var $i$$ = 0; $i$$ < $callbacks$$.length; $i$$++) {
    $callbacks$$[$i$$]();
  }
}, goog.Dependency.defer_ = !1, goog.Dependency.callbackMap_ = {}, goog.Dependency.registerCallback_ = function($callback$$) {
  var $key$$ = Math.random().toString(32);
  goog.Dependency.callbackMap_[$key$$] = $callback$$;
  return $key$$;
}, goog.Dependency.unregisterCallback_ = function($key$$) {
  delete goog.Dependency.callbackMap_[$key$$];
}, goog.Dependency.callback_ = function($key$$, $var_args$$) {
  if ($key$$ in goog.Dependency.callbackMap_) {
    for (var $callback$$ = goog.Dependency.callbackMap_[$key$$], $args$$ = [], $i$$ = 1; $i$$ < arguments.length; $i$$++) {
      $args$$.push(arguments[$i$$]);
    }
    $callback$$.apply(void 0, $args$$);
  } else {
    throw Error("Callback key " + $key$$ + " does not exist (was base.js loaded more than once?).");
  }
}, goog.Dependency.prototype.load = function($controller$$) {
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? $controller$$.loaded() : $controller$$.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var $doc$$ = goog.global.document;
      if ("complete" == $doc$$.readyState && !goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING) {
        if (/\bdeps.js$/.test(this.path)) {
          $controller$$.loaded();
          return;
        }
        throw Error('Cannot write "' + this.path + '" after document load');
      }
      var $nonce$$ = goog.getScriptNonce_();
      if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && goog.isDocumentLoading_()) {
        var $callback$$ = function($script$$) {
          $script$$.readyState && "complete" != $script$$.readyState ? $script$$.onload = $callback$$ : (goog.Dependency.unregisterCallback_($key$$), $controller$$.loaded());
        };
        var $key$$ = goog.Dependency.registerCallback_($callback$$);
        $nonce$$ = $nonce$$ ? ' nonce="' + $nonce$$ + '"' : "";
        var $script$$ = '<script src="' + this.path + '"' + $nonce$$ + (goog.Dependency.defer_ ? " defer" : "") + ' id="script-' + $key$$ + '">\x3c/script>';
        $script$$ += "<script" + $nonce$$ + ">";
        $script$$ = goog.Dependency.defer_ ? $script$$ + ("document.getElementById('script-" + $key$$ + "').onload = function() {\n  goog.Dependency.callback_('" + $key$$ + "', this);\n};\n") : $script$$ + ("goog.Dependency.callback_('" + $key$$ + "', document.getElementById('script-" + $key$$ + "'));");
        $script$$ += "\x3c/script>";
        $doc$$.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML($script$$) : $script$$);
      } else {
        var $scriptEl$$ = $doc$$.createElement("script");
        $scriptEl$$.defer = goog.Dependency.defer_;
        $scriptEl$$.async = !1;
        $nonce$$ && ($scriptEl$$.nonce = $nonce$$);
        $scriptEl$$.onload = function() {
          $scriptEl$$.onload = null;
          $controller$$.loaded();
        };
        $scriptEl$$.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path) : this.path;
        $doc$$.head.appendChild($scriptEl$$);
      }
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), "deps.js" == this.relativePath ? (goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."), $controller$$.loaded()) : $controller$$.pause();
    }
  }
}, goog.Es6ModuleDependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  goog.Dependency.call(this, $path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$);
}, goog.inherits(goog.Es6ModuleDependency, goog.Dependency), goog.Es6ModuleDependency.prototype.load = function($controller$$) {
  function $write$$($script$jscomp$5_src$$, $contents$$) {
    var $nonceAttr$$ = "", $nonce$$ = goog.getScriptNonce_();
    $nonce$$ && ($nonceAttr$$ = ' nonce="' + $nonce$$ + '"');
    $script$jscomp$5_src$$ = $contents$$ ? '<script type="module" crossorigin' + $nonceAttr$$ + ">" + $contents$$ + "\x3c/script>" : '<script type="module" crossorigin src="' + $script$jscomp$5_src$$ + '"' + $nonceAttr$$ + ">\x3c/script>";
    $doc$$.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML($script$jscomp$5_src$$) : $script$jscomp$5_src$$);
  }
  function $append$$($src$$, $contents$$) {
    var $scriptEl$$ = $doc$$.createElement("script");
    $scriptEl$$.defer = !0;
    $scriptEl$$.async = !1;
    $scriptEl$$.type = "module";
    $scriptEl$$.setAttribute("crossorigin", !0);
    var $nonce$$ = goog.getScriptNonce_();
    $nonce$$ && ($scriptEl$$.nonce = $nonce$$);
    $contents$$ ? $scriptEl$$.text = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScript($contents$$) : $contents$$ : $scriptEl$$.src = goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createScriptURL($src$$) : $src$$;
    $doc$$.head.appendChild($scriptEl$$);
  }
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    goog.global.CLOSURE_IMPORT_SCRIPT(this.path) ? $controller$$.loaded() : $controller$$.pause();
  } else {
    if (goog.inHtmlDocument_()) {
      var $doc$$ = goog.global.document, $dep$$ = this;
      if (goog.isDocumentLoading_()) {
        var $create$$ = $write$$;
        goog.Dependency.defer_ = !0;
      } else {
        $create$$ = $append$$;
      }
      var $beforeKey$$ = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_($beforeKey$$);
        $controller$$.setModuleState(goog.ModuleType.ES6);
      });
      $create$$(void 0, 'goog.Dependency.callback_("' + $beforeKey$$ + '")');
      $create$$(this.path, void 0);
      var $registerKey$$ = goog.Dependency.registerCallback_(function($exports$$) {
        goog.Dependency.unregisterCallback_($registerKey$$);
        $controller$$.registerEs6ModuleExports($dep$$.path, $exports$$, goog.moduleLoaderState_.moduleName);
      });
      $create$$(void 0, 'import * as m from "' + this.path + '"; goog.Dependency.callback_("' + $registerKey$$ + '", m)');
      var $afterKey$$ = goog.Dependency.registerCallback_(function() {
        goog.Dependency.unregisterCallback_($afterKey$$);
        $controller$$.clearModuleState();
        $controller$$.loaded();
      });
      $create$$(void 0, 'goog.Dependency.callback_("' + $afterKey$$ + '")');
    } else {
      goog.logToConsole_("Cannot use default debug loader outside of HTML documents."), $controller$$.pause();
    }
  }
}, goog.TransformedDependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  goog.Dependency.call(this, $path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$);
  this.contents_ = null;
  this.lazyFetch_ = !goog.inHtmlDocument_() || !("noModule" in goog.global.document.createElement("script"));
}, goog.inherits(goog.TransformedDependency, goog.Dependency), goog.TransformedDependency.prototype.load = function($controller$$) {
  function $fetch$$() {
    $dep$$.contents_ = goog.loadFileSync_($dep$$.path);
    $dep$$.contents_ && ($dep$$.contents_ = $dep$$.transform($dep$$.contents_), $dep$$.contents_ && ($dep$$.contents_ += "\n//# sourceURL=" + $dep$$.path));
  }
  function $load$$() {
    $dep$$.lazyFetch_ && $fetch$$();
    if ($dep$$.contents_) {
      $isEs6$$ && $controller$$.setModuleState(goog.ModuleType.ES6);
      try {
        var $contents$$ = $dep$$.contents_;
        $dep$$.contents_ = null;
        goog.globalEval(goog.CLOSURE_EVAL_PREFILTER_.createScript($contents$$));
        if ($isEs6$$) {
          var $namespace$$ = goog.moduleLoaderState_.moduleName;
        }
      } finally {
        $isEs6$$ && $controller$$.clearModuleState();
      }
      $isEs6$$ && goog.global.$jscomp.require.ensure([$dep$$.getPathName()], function() {
        $controller$$.registerEs6ModuleExports($dep$$.path, goog.global.$jscomp.require($dep$$.getPathName()), $namespace$$);
      });
      $controller$$.loaded();
    }
  }
  function $fetchInOwnScriptThenLoad$$() {
    var $doc$$ = goog.global.document, $key$$ = goog.Dependency.registerCallback_(function() {
      goog.Dependency.unregisterCallback_($key$$);
      $load$$();
    }), $nonce$jscomp$4_script$$ = goog.getScriptNonce_();
    $nonce$jscomp$4_script$$ = "<script" + ($nonce$jscomp$4_script$$ ? ' nonce="' + $nonce$jscomp$4_script$$ + '"' : "") + ">" + goog.protectScriptTag_('goog.Dependency.callback_("' + $key$$ + '");') + "\x3c/script>";
    $doc$$.write(goog.TRUSTED_TYPES_POLICY_ ? goog.TRUSTED_TYPES_POLICY_.createHTML($nonce$jscomp$4_script$$) : $nonce$jscomp$4_script$$);
  }
  var $dep$$ = this;
  if (goog.global.CLOSURE_IMPORT_SCRIPT) {
    $fetch$$(), this.contents_ && goog.global.CLOSURE_IMPORT_SCRIPT("", this.contents_) ? (this.contents_ = null, $controller$$.loaded()) : $controller$$.pause();
  } else {
    var $isEs6$$ = this.loadFlags.module == goog.ModuleType.ES6;
    this.lazyFetch_ || $fetch$$();
    var $anythingElsePending_isInternetExplorerOrEdge$$ = 1 < $controller$$.pending().length;
    if (goog.Dependency.defer_ && ($anythingElsePending_isInternetExplorerOrEdge$$ || goog.isDocumentLoading_())) {
      $controller$$.defer(function() {
        $load$$();
      });
    } else {
      var $doc$$ = goog.global.document;
      $anythingElsePending_isInternetExplorerOrEdge$$ = goog.inHtmlDocument_() && ("ActiveXObject" in goog.global || goog.isEdge_());
      if ($isEs6$$ && goog.inHtmlDocument_() && goog.isDocumentLoading_() && !$anythingElsePending_isInternetExplorerOrEdge$$) {
        goog.Dependency.defer_ = !0;
        $controller$$.pause();
        var $oldCallback$$ = $doc$$.onreadystatechange;
        $doc$$.onreadystatechange = function() {
          "interactive" == $doc$$.readyState && ($doc$$.onreadystatechange = $oldCallback$$, $load$$(), $controller$$.resume());
          "function" === typeof $oldCallback$$ && $oldCallback$$.apply(void 0, arguments);
        };
      } else {
        goog.inHtmlDocument_() && goog.isDocumentLoading_() ? $fetchInOwnScriptThenLoad$$() : $load$$();
      }
    }
  }
}, goog.TransformedDependency.prototype.transform = function($contents$$) {
}, goog.PreTranspiledEs6ModuleDependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  goog.TransformedDependency.call(this, $path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$);
}, goog.inherits(goog.PreTranspiledEs6ModuleDependency, goog.TransformedDependency), goog.PreTranspiledEs6ModuleDependency.prototype.transform = function($contents$$) {
  return $contents$$;
}, goog.GoogModuleDependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  goog.TransformedDependency.call(this, $path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$);
}, goog.inherits(goog.GoogModuleDependency, goog.TransformedDependency), goog.GoogModuleDependency.prototype.transform = function($contents$$) {
  return goog.LOAD_MODULE_USING_EVAL && void 0 !== goog.global.JSON ? "goog.loadModule(" + goog.global.JSON.stringify($contents$$ + "\n//# sourceURL=" + this.path + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + $contents$$ + "\n;return exports});\n//# sourceURL=" + this.path + "\n";
}, goog.DebugLoader_.prototype.addDependency = function($relPath$$, $provides$$, $dep$jscomp$6_i$jscomp$16_requires$$, $opt_loadFlags$$) {
  $provides$$ = $provides$$ || [];
  $relPath$$ = $relPath$$.replace(/\\/g, "/");
  var $path$$ = goog.normalizePath_(goog.basePath + $relPath$$);
  $opt_loadFlags$$ && "boolean" !== typeof $opt_loadFlags$$ || ($opt_loadFlags$$ = $opt_loadFlags$$ ? {module:goog.ModuleType.GOOG} : {});
  $dep$jscomp$6_i$jscomp$16_requires$$ = this.factory_.createDependency($path$$, $relPath$$, $provides$$, $dep$jscomp$6_i$jscomp$16_requires$$, $opt_loadFlags$$);
  this.dependencies_[$path$$] = $dep$jscomp$6_i$jscomp$16_requires$$;
  for ($dep$jscomp$6_i$jscomp$16_requires$$ = 0; $dep$jscomp$6_i$jscomp$16_requires$$ < $provides$$.length; $dep$jscomp$6_i$jscomp$16_requires$$++) {
    this.idToPath_[$provides$$[$dep$jscomp$6_i$jscomp$16_requires$$]] = $path$$;
  }
  this.idToPath_[$relPath$$] = $path$$;
}, goog.DependencyFactory = function() {
}, goog.DependencyFactory.prototype.createDependency = function($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) {
  return $loadFlags$$.module == goog.ModuleType.GOOG ? new goog.GoogModuleDependency($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) : $loadFlags$$.module == goog.ModuleType.ES6 ? goog.ASSUME_ES_MODULES_TRANSPILED ? new goog.PreTranspiledEs6ModuleDependency($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) : new goog.Es6ModuleDependency($path$$, $relativePath$$, $provides$$, $requires$$, $loadFlags$$) : new goog.Dependency($path$$, $relativePath$$, $provides$$, $requires$$,
  $loadFlags$$);
}, goog.debugLoader_ = new goog.DebugLoader_(), goog.loadClosureDeps = function() {
  goog.debugLoader_.loadClosureDeps();
}, goog.setDependencyFactory = function($factory$$) {
  goog.debugLoader_.setDependencyFactory($factory$$);
}, goog.TRUSTED_TYPES_POLICY_ = goog.TRUSTED_TYPES_POLICY_NAME ? goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME + "#base") : null, goog.global.CLOSURE_NO_DEPS || goog.debugLoader_.loadClosureDeps(), goog.bootstrap = function($namespaces$$, $callback$$) {
  goog.debugLoader_.bootstrap($namespaces$$, $callback$$);
});
if (!COMPILED) {
  var isChrome87 = !1;
  try {
    isChrome87 = eval(goog.global.trustedTypes.emptyScript) !== goog.global.trustedTypes.emptyScript;
  } catch ($err$$) {
  }
  goog.CLOSURE_EVAL_PREFILTER_ = goog.global.trustedTypes && isChrome87 && goog.createTrustedTypesPolicy("goog#base#devonly#eval") || {createScript:goog.identity_};
}
;goog.debug = {};
function module$contents$goog$debug$Error_DebugError($msg$$, $cause$$) {
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, module$contents$goog$debug$Error_DebugError);
  } else {
    const $stack$$ = Error().stack;
    $stack$$ && (this.stack = $stack$$);
  }
  $msg$$ && (this.message = String($msg$$));
  void 0 !== $cause$$ && (this.cause = $cause$$);
  this.reportErrorToServer = !0;
}
goog.inherits(module$contents$goog$debug$Error_DebugError, Error);
module$contents$goog$debug$Error_DebugError.prototype.name = "CustomError";
goog.debug.Error = module$contents$goog$debug$Error_DebugError;
goog.dom = {};
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
function module$contents$goog$asserts_AssertionError($messagePattern$$, $messageArgs$$) {
  module$contents$goog$debug$Error_DebugError.call(this, module$contents$goog$asserts_subs($messagePattern$$, $messageArgs$$));
  this.messagePattern = $messagePattern$$;
}
goog.inherits(module$contents$goog$asserts_AssertionError, module$contents$goog$debug$Error_DebugError);
goog.asserts.AssertionError = module$contents$goog$asserts_AssertionError;
module$contents$goog$asserts_AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function($e$$) {
  throw $e$$;
};
let module$contents$goog$asserts_errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
function module$contents$goog$asserts_subs($pattern$$, $subs$$) {
  $pattern$$ = $pattern$$.split("%s");
  let $returnString$$ = "";
  const $subLast$$ = $pattern$$.length - 1;
  for (let $i$$ = 0; $i$$ < $subLast$$; $i$$++) {
    $returnString$$ += $pattern$$[$i$$] + ($i$$ < $subs$$.length ? $subs$$[$i$$] : "%s");
  }
  return $returnString$$ + $pattern$$[$subLast$$];
}
function module$contents$goog$asserts_doAssertFailure($defaultMessage_e$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  let $message$$ = "Assertion failed", $args$$;
  $givenMessage$$ ? ($message$$ += ": " + $givenMessage$$, $args$$ = $givenArgs$$) : $defaultMessage_e$$ && ($message$$ += ": " + $defaultMessage_e$$, $args$$ = $defaultArgs$$);
  $defaultMessage_e$$ = new module$contents$goog$asserts_AssertionError("" + $message$$, $args$$ || []);
  module$contents$goog$asserts_errorHandler_($defaultMessage_e$$);
}
goog.asserts.setErrorHandler = function($errorHandler$$) {
  goog.asserts.ENABLE_ASSERTS && (module$contents$goog$asserts_errorHandler_ = $errorHandler$$);
};
goog.asserts.assert = function($condition$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !$condition$$ && module$contents$goog$asserts_doAssertFailure("", null, $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $condition$$;
};
goog.asserts.assertExists = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && null == $value$$ && module$contents$goog$asserts_doAssertFailure("Expected to exist: %s.", [$value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.fail = function($opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && module$contents$goog$asserts_errorHandler_(new module$contents$goog$asserts_AssertionError("Failure" + ($opt_message$$ ? ": " + $opt_message$$ : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && "number" !== typeof $value$$ && module$contents$goog$asserts_doAssertFailure("Expected number but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertString = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && "string" !== typeof $value$$ && module$contents$goog$asserts_doAssertFailure("Expected string but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertFunction = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && "function" !== typeof $value$$ && module$contents$goog$asserts_doAssertFailure("Expected function but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertObject = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject($value$$) && module$contents$goog$asserts_doAssertFailure("Expected object but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertArray = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !Array.isArray($value$$) && module$contents$goog$asserts_doAssertFailure("Expected array but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertBoolean = function($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && "boolean" !== typeof $value$$ && module$contents$goog$asserts_doAssertFailure("Expected boolean but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertElement = function($value$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || goog.isObject($value$$) && $value$$.nodeType == goog.dom.NodeType.ELEMENT || module$contents$goog$asserts_doAssertFailure("Expected Element but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
goog.asserts.assertInstanceof = function($value$$, $type$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || $value$$ instanceof $type$$ || module$contents$goog$asserts_doAssertFailure("Expected instanceof %s but got %s.", [module$contents$goog$asserts_getType($type$$), module$contents$goog$asserts_getType($value$$)], $opt_message$$, Array.prototype.slice.call(arguments, 3));
  return $value$$;
};
goog.asserts.assertFinite = function($value$$, $opt_message$$, $var_args$$) {
  !goog.asserts.ENABLE_ASSERTS || "number" == typeof $value$$ && isFinite($value$$) || module$contents$goog$asserts_doAssertFailure("Expected %s to be a finite number but it is not.", [$value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$;
};
function module$contents$goog$asserts_getType($value$$) {
  return $value$$ instanceof Function ? $value$$.displayName || $value$$.name || "unknown type name" : $value$$ instanceof Object ? $value$$.constructor.displayName || $value$$.constructor.name || Object.prototype.toString.call($value$$) : null === $value$$ ? "null" : typeof $value$$;
}
;goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
const module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS = 2012 < goog.FEATURESET_YEAR;
goog.array.ASSUME_NATIVE_FUNCTIONS = module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS;
function module$contents$goog$array_peek($array$$) {
  return $array$$[$array$$.length - 1];
}
goog.array.peek = module$contents$goog$array_peek;
goog.array.last = module$contents$goog$array_peek;
const module$contents$goog$array_indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.indexOf.call($arr$$, $obj$$, $opt_fromIndex$$);
} : function($arr$$, $obj$$, $fromIndex_i$jscomp$18_opt_fromIndex$$) {
  $fromIndex_i$jscomp$18_opt_fromIndex$$ = null == $fromIndex_i$jscomp$18_opt_fromIndex$$ ? 0 : 0 > $fromIndex_i$jscomp$18_opt_fromIndex$$ ? Math.max(0, $arr$$.length + $fromIndex_i$jscomp$18_opt_fromIndex$$) : $fromIndex_i$jscomp$18_opt_fromIndex$$;
  if ("string" === typeof $arr$$) {
    return "string" !== typeof $obj$$ || 1 != $obj$$.length ? -1 : $arr$$.indexOf($obj$$, $fromIndex_i$jscomp$18_opt_fromIndex$$);
  }
  for (; $fromIndex_i$jscomp$18_opt_fromIndex$$ < $arr$$.length; $fromIndex_i$jscomp$18_opt_fromIndex$$++) {
    if ($fromIndex_i$jscomp$18_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex_i$jscomp$18_opt_fromIndex$$] === $obj$$) {
      return $fromIndex_i$jscomp$18_opt_fromIndex$$;
    }
  }
  return -1;
};
goog.array.indexOf = module$contents$goog$array_indexOf;
const module$contents$goog$array_lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.lastIndexOf.call($arr$$, $obj$$, null == $opt_fromIndex$$ ? $arr$$.length - 1 : $opt_fromIndex$$);
} : function($arr$$, $obj$$, $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$) {
  $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$ = null == $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$;
  0 > $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$ && ($fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$ = Math.max(0, $arr$$.length + $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$));
  if ("string" === typeof $arr$$) {
    return "string" !== typeof $obj$$ || 1 != $obj$$.length ? -1 : $arr$$.lastIndexOf($obj$$, $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$);
  }
  for (; 0 <= $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$; $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$--) {
    if ($fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$] === $obj$$) {
      return $fromIndex$jscomp$2_i$jscomp$19_opt_fromIndex$$;
    }
  }
  return -1;
};
goog.array.lastIndexOf = module$contents$goog$array_lastIndexOf;
const module$contents$goog$array_forEach = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  Array.prototype.forEach.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    $i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$);
  }
};
goog.array.forEach = module$contents$goog$array_forEach;
function module$contents$goog$array_forEachRight($arr$$, $f$$, $opt_obj$$) {
  var $i$jscomp$21_l$$ = $arr$$.length;
  const $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (--$i$jscomp$21_l$$; 0 <= $i$jscomp$21_l$$; --$i$jscomp$21_l$$) {
    $i$jscomp$21_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$jscomp$21_l$$], $i$jscomp$21_l$$, $arr$$);
  }
}
goog.array.forEachRight = module$contents$goog$array_forEachRight;
const module$contents$goog$array_filter = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.filter.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $res$$ = [];
  let $resLength$$ = 0;
  const $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$) {
      const $val$$ = $arr2$$[$i$$];
      $f$$.call($opt_obj$$, $val$$, $i$$, $arr$$) && ($res$$[$resLength$$++] = $val$$);
    }
  }
  return $res$$;
};
goog.array.filter = module$contents$goog$array_filter;
const module$contents$goog$array_map = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.map.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $res$$ = Array($l$$), $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    $i$$ in $arr2$$ && ($res$$[$i$$] = $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$));
  }
  return $res$$;
};
goog.array.map = module$contents$goog$array_map;
const module$contents$goog$array_reduce = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function($arr$$, $f$$, $val$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  $opt_obj$$ && ($f$$ = goog.bind($f$$, $opt_obj$$));
  return Array.prototype.reduce.call($arr$$, $f$$, $val$$);
} : function($arr$$, $f$$, $val$$, $opt_obj$$) {
  let $rval$$ = $val$$;
  module$contents$goog$array_forEach($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$);
  });
  return $rval$$;
};
goog.array.reduce = module$contents$goog$array_reduce;
const module$contents$goog$array_reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function($arr$$, $f$$, $val$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.asserts.assert(null != $f$$);
  $opt_obj$$ && ($f$$ = goog.bind($f$$, $opt_obj$$));
  return Array.prototype.reduceRight.call($arr$$, $f$$, $val$$);
} : function($arr$$, $f$$, $val$$, $opt_obj$$) {
  let $rval$$ = $val$$;
  module$contents$goog$array_forEachRight($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$);
  });
  return $rval$$;
};
goog.array.reduceRight = module$contents$goog$array_reduceRight;
const module$contents$goog$array_some = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.some.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return !0;
    }
  }
  return !1;
};
goog.array.some = module$contents$goog$array_some;
const module$contents$goog$array_every = goog.NATIVE_ARRAY_PROTOTYPES && (module$contents$goog$array_ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.every.call($arr$$, $f$$, $opt_obj$$);
} : function($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && !$f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return !1;
    }
  }
  return !0;
};
goog.array.every = module$contents$goog$array_every;
function module$contents$goog$array_count($arr$$, $f$$, $opt_obj$$) {
  let $count$$ = 0;
  module$contents$goog$array_forEach($arr$$, function($element$$, $index$$, $arr$$) {
    $f$$.call($opt_obj$$, $element$$, $index$$, $arr$$) && ++$count$$;
  }, $opt_obj$$);
  return $count$$;
}
goog.array.count = module$contents$goog$array_count;
function module$contents$goog$array_find($arr$$, $f$jscomp$17_i$$, $opt_obj$$) {
  $f$jscomp$17_i$$ = module$contents$goog$array_findIndex($arr$$, $f$jscomp$17_i$$, $opt_obj$$);
  return 0 > $f$jscomp$17_i$$ ? null : "string" === typeof $arr$$ ? $arr$$.charAt($f$jscomp$17_i$$) : $arr$$[$f$jscomp$17_i$$];
}
goog.array.find = module$contents$goog$array_find;
function module$contents$goog$array_findIndex($arr$$, $f$$, $opt_obj$$) {
  const $l$$ = $arr$$.length, $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return $i$$;
    }
  }
  return -1;
}
goog.array.findIndex = module$contents$goog$array_findIndex;
function module$contents$goog$array_findRight($arr$$, $f$jscomp$19_i$$, $opt_obj$$) {
  $f$jscomp$19_i$$ = module$contents$goog$array_findIndexRight($arr$$, $f$jscomp$19_i$$, $opt_obj$$);
  return 0 > $f$jscomp$19_i$$ ? null : "string" === typeof $arr$$ ? $arr$$.charAt($f$jscomp$19_i$$) : $arr$$[$f$jscomp$19_i$$];
}
goog.array.findRight = module$contents$goog$array_findRight;
function module$contents$goog$array_findIndexRight($arr$$, $f$$, $opt_obj$$) {
  var $i$jscomp$29_l$$ = $arr$$.length;
  const $arr2$$ = "string" === typeof $arr$$ ? $arr$$.split("") : $arr$$;
  for (--$i$jscomp$29_l$$; 0 <= $i$jscomp$29_l$$; $i$jscomp$29_l$$--) {
    if ($i$jscomp$29_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$jscomp$29_l$$], $i$jscomp$29_l$$, $arr$$)) {
      return $i$jscomp$29_l$$;
    }
  }
  return -1;
}
goog.array.findIndexRight = module$contents$goog$array_findIndexRight;
function module$contents$goog$array_contains($arr$$, $obj$$) {
  return 0 <= module$contents$goog$array_indexOf($arr$$, $obj$$);
}
goog.array.contains = module$contents$goog$array_contains;
function module$contents$goog$array_isEmpty($arr$$) {
  return 0 == $arr$$.length;
}
goog.array.isEmpty = module$contents$goog$array_isEmpty;
function module$contents$goog$array_clear($arr$$) {
  if (!Array.isArray($arr$$)) {
    for (let $i$$ = $arr$$.length - 1; 0 <= $i$$; $i$$--) {
      delete $arr$$[$i$$];
    }
  }
  $arr$$.length = 0;
}
goog.array.clear = module$contents$goog$array_clear;
function module$contents$goog$array_insert($arr$$, $obj$$) {
  module$contents$goog$array_contains($arr$$, $obj$$) || $arr$$.push($obj$$);
}
goog.array.insert = module$contents$goog$array_insert;
function module$contents$goog$array_insertAt($arr$$, $obj$$, $opt_i$$) {
  module$contents$goog$array_splice($arr$$, $opt_i$$, 0, $obj$$);
}
goog.array.insertAt = module$contents$goog$array_insertAt;
function module$contents$goog$array_insertArrayAt($arr$$, $elementsToAdd$$, $opt_i$$) {
  goog.partial(module$contents$goog$array_splice, $arr$$, $opt_i$$, 0).apply(null, $elementsToAdd$$);
}
goog.array.insertArrayAt = module$contents$goog$array_insertArrayAt;
function module$contents$goog$array_insertBefore($arr$$, $obj$$, $opt_obj2$$) {
  let $i$$;
  2 == arguments.length || 0 > ($i$$ = module$contents$goog$array_indexOf($arr$$, $opt_obj2$$)) ? $arr$$.push($obj$$) : module$contents$goog$array_insertAt($arr$$, $obj$$, $i$$);
}
goog.array.insertBefore = module$contents$goog$array_insertBefore;
function module$contents$goog$array_remove($arr$$, $i$jscomp$32_obj$$) {
  $i$jscomp$32_obj$$ = module$contents$goog$array_indexOf($arr$$, $i$jscomp$32_obj$$);
  let $rv$$;
  ($rv$$ = 0 <= $i$jscomp$32_obj$$) && module$contents$goog$array_removeAt($arr$$, $i$jscomp$32_obj$$);
  return $rv$$;
}
goog.array.remove = module$contents$goog$array_remove;
function module$contents$goog$array_removeLast($arr$$, $i$jscomp$33_obj$$) {
  $i$jscomp$33_obj$$ = module$contents$goog$array_lastIndexOf($arr$$, $i$jscomp$33_obj$$);
  return 0 <= $i$jscomp$33_obj$$ ? (module$contents$goog$array_removeAt($arr$$, $i$jscomp$33_obj$$), !0) : !1;
}
goog.array.removeLast = module$contents$goog$array_removeLast;
function module$contents$goog$array_removeAt($arr$$, $i$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 1 == Array.prototype.splice.call($arr$$, $i$$, 1).length;
}
goog.array.removeAt = module$contents$goog$array_removeAt;
function module$contents$goog$array_removeIf($arr$$, $f$jscomp$21_i$$, $opt_obj$$) {
  $f$jscomp$21_i$$ = module$contents$goog$array_findIndex($arr$$, $f$jscomp$21_i$$, $opt_obj$$);
  return 0 <= $f$jscomp$21_i$$ ? (module$contents$goog$array_removeAt($arr$$, $f$jscomp$21_i$$), !0) : !1;
}
goog.array.removeIf = module$contents$goog$array_removeIf;
function module$contents$goog$array_removeAllIf($arr$$, $f$$, $opt_obj$$) {
  let $removedCount$$ = 0;
  module$contents$goog$array_forEachRight($arr$$, function($val$$, $index$$) {
    $f$$.call($opt_obj$$, $val$$, $index$$, $arr$$) && module$contents$goog$array_removeAt($arr$$, $index$$) && $removedCount$$++;
  });
  return $removedCount$$;
}
goog.array.removeAllIf = module$contents$goog$array_removeAllIf;
function module$contents$goog$array_concat($var_args$$) {
  return Array.prototype.concat.apply([], arguments);
}
goog.array.concat = module$contents$goog$array_concat;
function module$contents$goog$array_join($var_args$$) {
  return Array.prototype.concat.apply([], arguments);
}
goog.array.join = module$contents$goog$array_join;
function module$contents$goog$array_toArray($object$$) {
  const $length$$ = $object$$.length;
  if (0 < $length$$) {
    const $rv$$ = Array($length$$);
    for (let $i$$ = 0; $i$$ < $length$$; $i$$++) {
      $rv$$[$i$$] = $object$$[$i$$];
    }
    return $rv$$;
  }
  return [];
}
const module$contents$goog$array_clone = goog.array.toArray = module$contents$goog$array_toArray;
goog.array.clone = module$contents$goog$array_toArray;
function module$contents$goog$array_extend($arr1$$, $var_args$$) {
  for (let $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    const $arr2$$ = arguments[$i$$];
    if (goog.isArrayLike($arr2$$)) {
      const $len1$$ = $arr1$$.length || 0, $len2$$ = $arr2$$.length || 0;
      $arr1$$.length = $len1$$ + $len2$$;
      for (let $j$$ = 0; $j$$ < $len2$$; $j$$++) {
        $arr1$$[$len1$$ + $j$$] = $arr2$$[$j$$];
      }
    } else {
      $arr1$$.push($arr2$$);
    }
  }
}
goog.array.extend = module$contents$goog$array_extend;
function module$contents$goog$array_splice($arr$$, $index$$, $howMany$$, $var_args$$) {
  goog.asserts.assert(null != $arr$$.length);
  return Array.prototype.splice.apply($arr$$, module$contents$goog$array_slice(arguments, 1));
}
goog.array.splice = module$contents$goog$array_splice;
function module$contents$goog$array_slice($arr$$, $start$$, $opt_end$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 2 >= arguments.length ? Array.prototype.slice.call($arr$$, $start$$) : Array.prototype.slice.call($arr$$, $start$$, $opt_end$$);
}
goog.array.slice = module$contents$goog$array_slice;
function module$contents$goog$array_removeDuplicates($arr$$, $opt_rv_returnArray$$, $hashFn_opt_hashFn$$) {
  $opt_rv_returnArray$$ = $opt_rv_returnArray$$ || $arr$$;
  var $cursorInsert_defaultHashFn$$ = function($item$$) {
    return goog.isObject($item$$) ? "o" + goog.getUid($item$$) : (typeof $item$$).charAt(0) + $item$$;
  };
  $hashFn_opt_hashFn$$ = $hashFn_opt_hashFn$$ || $cursorInsert_defaultHashFn$$;
  let $cursorRead$$ = $cursorInsert_defaultHashFn$$ = 0;
  const $seen$$ = {};
  for (; $cursorRead$$ < $arr$$.length;) {
    const $current$$ = $arr$$[$cursorRead$$++], $key$$ = $hashFn_opt_hashFn$$($current$$);
    Object.prototype.hasOwnProperty.call($seen$$, $key$$) || ($seen$$[$key$$] = !0, $opt_rv_returnArray$$[$cursorInsert_defaultHashFn$$++] = $current$$);
  }
  $opt_rv_returnArray$$.length = $cursorInsert_defaultHashFn$$;
}
goog.array.removeDuplicates = module$contents$goog$array_removeDuplicates;
function module$contents$goog$array_binarySearch($arr$$, $target$$, $opt_compareFn$$) {
  return module$contents$goog$array_binarySearch_($arr$$, $opt_compareFn$$ || module$contents$goog$array_defaultCompare, !1, $target$$);
}
goog.array.binarySearch = module$contents$goog$array_binarySearch;
function module$contents$goog$array_binarySelect($arr$$, $evaluator$$, $opt_obj$$) {
  return module$contents$goog$array_binarySearch_($arr$$, $evaluator$$, !0, void 0, $opt_obj$$);
}
goog.array.binarySelect = module$contents$goog$array_binarySelect;
function module$contents$goog$array_binarySearch_($arr$$, $compareFn$$, $isEvaluator$$, $opt_target$$, $opt_selfObj$$) {
  let $left$$ = 0, $right$$ = $arr$$.length, $found$$;
  for (; $left$$ < $right$$;) {
    const $middle$$ = $left$$ + ($right$$ - $left$$ >>> 1);
    let $compareResult$$;
    $compareResult$$ = $isEvaluator$$ ? $compareFn$$.call($opt_selfObj$$, $arr$$[$middle$$], $middle$$, $arr$$) : $compareFn$$($opt_target$$, $arr$$[$middle$$]);
    0 < $compareResult$$ ? $left$$ = $middle$$ + 1 : ($right$$ = $middle$$, $found$$ = !$compareResult$$);
  }
  return $found$$ ? $left$$ : -$left$$ - 1;
}
function module$contents$goog$array_sort($arr$$, $opt_compareFn$$) {
  $arr$$.sort($opt_compareFn$$ || module$contents$goog$array_defaultCompare);
}
goog.array.sort = module$contents$goog$array_sort;
function module$contents$goog$array_stableSort($arr$$, $i$jscomp$39_opt_compareFn$$) {
  const $compArr$$ = Array($arr$$.length);
  for (let $i$$ = 0; $i$$ < $arr$$.length; $i$$++) {
    $compArr$$[$i$$] = {index:$i$$, value:$arr$$[$i$$]};
  }
  const $valueCompareFn$$ = $i$jscomp$39_opt_compareFn$$ || module$contents$goog$array_defaultCompare;
  module$contents$goog$array_sort($compArr$$, function($obj1$$, $obj2$$) {
    return $valueCompareFn$$($obj1$$.value, $obj2$$.value) || $obj1$$.index - $obj2$$.index;
  });
  for ($i$jscomp$39_opt_compareFn$$ = 0; $i$jscomp$39_opt_compareFn$$ < $arr$$.length; $i$jscomp$39_opt_compareFn$$++) {
    $arr$$[$i$jscomp$39_opt_compareFn$$] = $compArr$$[$i$jscomp$39_opt_compareFn$$].value;
  }
}
goog.array.stableSort = module$contents$goog$array_stableSort;
function module$contents$goog$array_sortByKey($arr$$, $keyFn$$, $opt_compareFn$$) {
  const $keyCompareFn$$ = $opt_compareFn$$ || module$contents$goog$array_defaultCompare;
  module$contents$goog$array_sort($arr$$, function($a$$, $b$$) {
    return $keyCompareFn$$($keyFn$$($a$$), $keyFn$$($b$$));
  });
}
goog.array.sortByKey = module$contents$goog$array_sortByKey;
function module$contents$goog$array_sortObjectsByKey($arr$$, $key$$, $opt_compareFn$$) {
  module$contents$goog$array_sortByKey($arr$$, function($obj$$) {
    return $obj$$[$key$$];
  }, $opt_compareFn$$);
}
goog.array.sortObjectsByKey = module$contents$goog$array_sortObjectsByKey;
function module$contents$goog$array_isSorted($arr$$, $compare_opt_compareFn$$, $opt_strict$$) {
  $compare_opt_compareFn$$ = $compare_opt_compareFn$$ || module$contents$goog$array_defaultCompare;
  for (let $i$$ = 1; $i$$ < $arr$$.length; $i$$++) {
    const $compareResult$$ = $compare_opt_compareFn$$($arr$$[$i$$ - 1], $arr$$[$i$$]);
    if (0 < $compareResult$$ || 0 == $compareResult$$ && $opt_strict$$) {
      return !1;
    }
  }
  return !0;
}
goog.array.isSorted = module$contents$goog$array_isSorted;
function module$contents$goog$array_equals($arr1$$, $arr2$$, $equalsFn_opt_equalsFn$$) {
  if (!goog.isArrayLike($arr1$$) || !goog.isArrayLike($arr2$$) || $arr1$$.length != $arr2$$.length) {
    return !1;
  }
  const $l$$ = $arr1$$.length;
  $equalsFn_opt_equalsFn$$ = $equalsFn_opt_equalsFn$$ || module$contents$goog$array_defaultCompareEquality;
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if (!$equalsFn_opt_equalsFn$$($arr1$$[$i$$], $arr2$$[$i$$])) {
      return !1;
    }
  }
  return !0;
}
goog.array.equals = module$contents$goog$array_equals;
function module$contents$goog$array_compare3($arr1$$, $arr2$$, $compare$jscomp$1_opt_compareFn$$) {
  $compare$jscomp$1_opt_compareFn$$ = $compare$jscomp$1_opt_compareFn$$ || module$contents$goog$array_defaultCompare;
  const $l$$ = Math.min($arr1$$.length, $arr2$$.length);
  for (let $i$$ = 0; $i$$ < $l$$; $i$$++) {
    const $result$$ = $compare$jscomp$1_opt_compareFn$$($arr1$$[$i$$], $arr2$$[$i$$]);
    if (0 != $result$$) {
      return $result$$;
    }
  }
  return module$contents$goog$array_defaultCompare($arr1$$.length, $arr2$$.length);
}
goog.array.compare3 = module$contents$goog$array_compare3;
function module$contents$goog$array_defaultCompare($a$$, $b$$) {
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0;
}
goog.array.defaultCompare = module$contents$goog$array_defaultCompare;
function module$contents$goog$array_inverseDefaultCompare($a$$, $b$$) {
  return -module$contents$goog$array_defaultCompare($a$$, $b$$);
}
goog.array.inverseDefaultCompare = module$contents$goog$array_inverseDefaultCompare;
function module$contents$goog$array_defaultCompareEquality($a$$, $b$$) {
  return $a$$ === $b$$;
}
goog.array.defaultCompareEquality = module$contents$goog$array_defaultCompareEquality;
function module$contents$goog$array_binaryInsert($array$$, $value$$, $index$jscomp$106_opt_compareFn$$) {
  $index$jscomp$106_opt_compareFn$$ = module$contents$goog$array_binarySearch($array$$, $value$$, $index$jscomp$106_opt_compareFn$$);
  return 0 > $index$jscomp$106_opt_compareFn$$ ? (module$contents$goog$array_insertAt($array$$, $value$$, -($index$jscomp$106_opt_compareFn$$ + 1)), !0) : !1;
}
goog.array.binaryInsert = module$contents$goog$array_binaryInsert;
function module$contents$goog$array_binaryRemove($array$$, $index$jscomp$107_value$$, $opt_compareFn$$) {
  $index$jscomp$107_value$$ = module$contents$goog$array_binarySearch($array$$, $index$jscomp$107_value$$, $opt_compareFn$$);
  return 0 <= $index$jscomp$107_value$$ ? module$contents$goog$array_removeAt($array$$, $index$jscomp$107_value$$) : !1;
}
goog.array.binaryRemove = module$contents$goog$array_binaryRemove;
function module$contents$goog$array_bucket($array$$, $sorter$$, $opt_obj$$) {
  const $buckets$$ = {};
  for (let $i$$ = 0; $i$$ < $array$$.length; $i$$++) {
    const $value$$ = $array$$[$i$$], $key$$ = $sorter$$.call($opt_obj$$, $value$$, $i$$, $array$$);
    void 0 !== $key$$ && ($buckets$$[$key$$] || ($buckets$$[$key$$] = [])).push($value$$);
  }
  return $buckets$$;
}
goog.array.bucket = module$contents$goog$array_bucket;
function module$contents$goog$array_bucketToMap($array$$, $sorter$$) {
  const $buckets$$ = new Map();
  for (let $i$$ = 0; $i$$ < $array$$.length; $i$$++) {
    const $value$$ = $array$$[$i$$], $key$$ = $sorter$$($value$$, $i$$, $array$$);
    if (void 0 !== $key$$) {
      let $bucket$$ = $buckets$$.get($key$$);
      $bucket$$ || ($bucket$$ = [], $buckets$$.set($key$$, $bucket$$));
      $bucket$$.push($value$$);
    }
  }
  return $buckets$$;
}
goog.array.bucketToMap = module$contents$goog$array_bucketToMap;
function module$contents$goog$array_toObject($arr$$, $keyFunc$$, $opt_obj$$) {
  const $ret$$ = {};
  module$contents$goog$array_forEach($arr$$, function($element$$, $index$$) {
    $ret$$[$keyFunc$$.call($opt_obj$$, $element$$, $index$$, $arr$$)] = $element$$;
  });
  return $ret$$;
}
goog.array.toObject = module$contents$goog$array_toObject;
function module$contents$goog$array_toMap($arr$$, $keyFunc$$) {
  const $map$$ = new Map();
  for (let $i$$ = 0; $i$$ < $arr$$.length; $i$$++) {
    const $element$$ = $arr$$[$i$$];
    $map$$.set($keyFunc$$($element$$, $i$$, $arr$$), $element$$);
  }
  return $map$$;
}
goog.array.toMap = module$contents$goog$array_toMap;
function module$contents$goog$array_range($i$jscomp$46_i$$, $opt_end$$, $opt_step_step$$) {
  const $array$$ = [];
  let $start$$ = 0, $end$$ = $i$jscomp$46_i$$;
  $opt_step_step$$ = $opt_step_step$$ || 1;
  void 0 !== $opt_end$$ && ($start$$ = $i$jscomp$46_i$$, $end$$ = $opt_end$$);
  if (0 > $opt_step_step$$ * ($end$$ - $start$$)) {
    return [];
  }
  if (0 < $opt_step_step$$) {
    for ($i$jscomp$46_i$$ = $start$$; $i$jscomp$46_i$$ < $end$$; $i$jscomp$46_i$$ += $opt_step_step$$) {
      $array$$.push($i$jscomp$46_i$$);
    }
  } else {
    for ($i$jscomp$46_i$$ = $start$$; $i$jscomp$46_i$$ > $end$$; $i$jscomp$46_i$$ += $opt_step_step$$) {
      $array$$.push($i$jscomp$46_i$$);
    }
  }
  return $array$$;
}
goog.array.range = module$contents$goog$array_range;
function module$contents$goog$array_repeat($value$$, $n$$) {
  const $array$$ = [];
  for (let $i$$ = 0; $i$$ < $n$$; $i$$++) {
    $array$$[$i$$] = $value$$;
  }
  return $array$$;
}
goog.array.repeat = module$contents$goog$array_repeat;
function module$contents$goog$array_flatten($var_args$$) {
  const $result$$ = [];
  for (let $i$$ = 0; $i$$ < arguments.length; $i$$++) {
    const $element$$ = arguments[$i$$];
    if (Array.isArray($element$$)) {
      for (let $c$$ = 0; $c$$ < $element$$.length; $c$$ += 8192) {
        var $chunk$$ = module$contents$goog$array_slice($element$$, $c$$, $c$$ + 8192);
        $chunk$$ = module$contents$goog$array_flatten.apply(null, $chunk$$);
        for (let $r$$ = 0; $r$$ < $chunk$$.length; $r$$++) {
          $result$$.push($chunk$$[$r$$]);
        }
      }
    } else {
      $result$$.push($element$$);
    }
  }
  return $result$$;
}
goog.array.flatten = module$contents$goog$array_flatten;
function module$contents$goog$array_rotate($array$$, $n$$) {
  goog.asserts.assert(null != $array$$.length);
  $array$$.length && ($n$$ %= $array$$.length, 0 < $n$$ ? Array.prototype.unshift.apply($array$$, $array$$.splice(-$n$$, $n$$)) : 0 > $n$$ && Array.prototype.push.apply($array$$, $array$$.splice(0, -$n$$)));
  return $array$$;
}
goog.array.rotate = module$contents$goog$array_rotate;
function module$contents$goog$array_moveItem($arr$$, $fromIndex$$, $toIndex$$) {
  goog.asserts.assert(0 <= $fromIndex$$ && $fromIndex$$ < $arr$$.length);
  goog.asserts.assert(0 <= $toIndex$$ && $toIndex$$ < $arr$$.length);
  $fromIndex$$ = Array.prototype.splice.call($arr$$, $fromIndex$$, 1);
  Array.prototype.splice.call($arr$$, $toIndex$$, 0, $fromIndex$$[0]);
}
goog.array.moveItem = module$contents$goog$array_moveItem;
function module$contents$goog$array_zip($var_args$$) {
  if (!arguments.length) {
    return [];
  }
  const $result$$ = [];
  let $minLen$$ = arguments[0].length;
  for (var $i$jscomp$50_i$$ = 1; $i$jscomp$50_i$$ < arguments.length; $i$jscomp$50_i$$++) {
    arguments[$i$jscomp$50_i$$].length < $minLen$$ && ($minLen$$ = arguments[$i$jscomp$50_i$$].length);
  }
  for ($i$jscomp$50_i$$ = 0; $i$jscomp$50_i$$ < $minLen$$; $i$jscomp$50_i$$++) {
    const $value$$ = [];
    for (let $j$$ = 0; $j$$ < arguments.length; $j$$++) {
      $value$$.push(arguments[$j$$][$i$jscomp$50_i$$]);
    }
    $result$$.push($value$$);
  }
  return $result$$;
}
goog.array.zip = module$contents$goog$array_zip;
function module$contents$goog$array_shuffle($arr$$, $opt_randFn_randFn$$) {
  $opt_randFn_randFn$$ = $opt_randFn_randFn$$ || Math.random;
  for (let $i$$ = $arr$$.length - 1; 0 < $i$$; $i$$--) {
    const $j$$ = Math.floor($opt_randFn_randFn$$() * ($i$$ + 1)), $tmp$$ = $arr$$[$i$$];
    $arr$$[$i$$] = $arr$$[$j$$];
    $arr$$[$j$$] = $tmp$$;
  }
}
goog.array.shuffle = module$contents$goog$array_shuffle;
function module$contents$goog$array_copyByIndex($arr$$, $index_arr$$) {
  const $result$$ = [];
  module$contents$goog$array_forEach($index_arr$$, function($index$$) {
    $result$$.push($arr$$[$index$$]);
  });
  return $result$$;
}
goog.array.copyByIndex = module$contents$goog$array_copyByIndex;
function module$contents$goog$array_concatMap($arr$$, $f$$, $opt_obj$$) {
  return module$contents$goog$array_concat.apply([], module$contents$goog$array_map($arr$$, $f$$, $opt_obj$$));
}
goog.array.concatMap = module$contents$goog$array_concatMap;
goog.collections = {};
goog.collections.maps = {};
class module$contents$goog$collections$maps_MapLike {
  constructor() {
  }
  set($key$$, $val$$) {
  }
  get($key$$) {
  }
  keys() {
  }
  values() {
  }
  has($key$$) {
  }
}
goog.collections.maps.MapLike = module$contents$goog$collections$maps_MapLike;
function module$contents$goog$collections$maps_setAll($map$$, $entries$$) {
  if ($entries$$) {
    for (const [$k$$, $v$$] of $entries$$) {
      $map$$.set($k$$, $v$$);
    }
  }
}
goog.collections.maps.setAll = module$contents$goog$collections$maps_setAll;
function module$contents$goog$collections$maps_hasValue($map$$, $val$$, $valueEqualityFn$$ = module$contents$goog$collections$maps_defaultEqualityFn) {
  for (const $v$$ of $map$$.values()) {
    if ($valueEqualityFn$$($v$$, $val$$)) {
      return !0;
    }
  }
  return !1;
}
goog.collections.maps.hasValue = module$contents$goog$collections$maps_hasValue;
const module$contents$goog$collections$maps_defaultEqualityFn = ($a$$, $b$$) => $a$$ === $b$$;
function module$contents$goog$collections$maps_equals($map$$, $otherMap$$, $valueEqualityFn$$ = module$contents$goog$collections$maps_defaultEqualityFn) {
  if ($map$$ === $otherMap$$) {
    return !0;
  }
  if ($map$$.size !== $otherMap$$.size) {
    return !1;
  }
  for (const $key$$ of $map$$.keys()) {
    if (!$otherMap$$.has($key$$) || !$valueEqualityFn$$($map$$.get($key$$), $otherMap$$.get($key$$))) {
      return !1;
    }
  }
  return !0;
}
goog.collections.maps.equals = module$contents$goog$collections$maps_equals;
function module$contents$goog$collections$maps_transpose($map$$) {
  const $transposed$$ = new Map();
  for (const $key$$ of $map$$.keys()) {
    const $val$$ = $map$$.get($key$$);
    $transposed$$.set($val$$, $key$$);
  }
  return $transposed$$;
}
goog.collections.maps.transpose = module$contents$goog$collections$maps_transpose;
function module$contents$goog$collections$maps_toObject($map$$) {
  const $obj$$ = {};
  for (const $key$$ of $map$$.keys()) {
    $obj$$[$key$$] = $map$$.get($key$$);
  }
  return $obj$$;
}
goog.collections.maps.toObject = module$contents$goog$collections$maps_toObject;
goog.dom.HtmlElement = function() {
};
goog.dom.TagName = class {
  static cast($name$$, $type$$) {
    return $name$$;
  }
  constructor() {
  }
  toString() {
  }
};
goog.dom.TagName.A = "A";
goog.dom.TagName.ABBR = "ABBR";
goog.dom.TagName.ACRONYM = "ACRONYM";
goog.dom.TagName.ADDRESS = "ADDRESS";
goog.dom.TagName.APPLET = "APPLET";
goog.dom.TagName.AREA = "AREA";
goog.dom.TagName.ARTICLE = "ARTICLE";
goog.dom.TagName.ASIDE = "ASIDE";
goog.dom.TagName.AUDIO = "AUDIO";
goog.dom.TagName.B = "B";
goog.dom.TagName.BASE = "BASE";
goog.dom.TagName.BASEFONT = "BASEFONT";
goog.dom.TagName.BDI = "BDI";
goog.dom.TagName.BDO = "BDO";
goog.dom.TagName.BIG = "BIG";
goog.dom.TagName.BLOCKQUOTE = "BLOCKQUOTE";
goog.dom.TagName.BODY = "BODY";
goog.dom.TagName.BR = "BR";
goog.dom.TagName.BUTTON = "BUTTON";
goog.dom.TagName.CANVAS = "CANVAS";
goog.dom.TagName.CAPTION = "CAPTION";
goog.dom.TagName.CENTER = "CENTER";
goog.dom.TagName.CITE = "CITE";
goog.dom.TagName.CODE = "CODE";
goog.dom.TagName.COL = "COL";
goog.dom.TagName.COLGROUP = "COLGROUP";
goog.dom.TagName.COMMAND = "COMMAND";
goog.dom.TagName.DATA = "DATA";
goog.dom.TagName.DATALIST = "DATALIST";
goog.dom.TagName.DD = "DD";
goog.dom.TagName.DEL = "DEL";
goog.dom.TagName.DETAILS = "DETAILS";
goog.dom.TagName.DFN = "DFN";
goog.dom.TagName.DIALOG = "DIALOG";
goog.dom.TagName.DIR = "DIR";
goog.dom.TagName.DIV = "DIV";
goog.dom.TagName.DL = "DL";
goog.dom.TagName.DT = "DT";
goog.dom.TagName.EM = "EM";
goog.dom.TagName.EMBED = "EMBED";
goog.dom.TagName.FIELDSET = "FIELDSET";
goog.dom.TagName.FIGCAPTION = "FIGCAPTION";
goog.dom.TagName.FIGURE = "FIGURE";
goog.dom.TagName.FONT = "FONT";
goog.dom.TagName.FOOTER = "FOOTER";
goog.dom.TagName.FORM = "FORM";
goog.dom.TagName.FRAME = "FRAME";
goog.dom.TagName.FRAMESET = "FRAMESET";
goog.dom.TagName.H1 = "H1";
goog.dom.TagName.H2 = "H2";
goog.dom.TagName.H3 = "H3";
goog.dom.TagName.H4 = "H4";
goog.dom.TagName.H5 = "H5";
goog.dom.TagName.H6 = "H6";
goog.dom.TagName.HEAD = "HEAD";
goog.dom.TagName.HEADER = "HEADER";
goog.dom.TagName.HGROUP = "HGROUP";
goog.dom.TagName.HR = "HR";
goog.dom.TagName.HTML = "HTML";
goog.dom.TagName.I = "I";
goog.dom.TagName.IFRAME = "IFRAME";
goog.dom.TagName.IMG = "IMG";
goog.dom.TagName.INPUT = "INPUT";
goog.dom.TagName.INS = "INS";
goog.dom.TagName.ISINDEX = "ISINDEX";
goog.dom.TagName.KBD = "KBD";
goog.dom.TagName.KEYGEN = "KEYGEN";
goog.dom.TagName.LABEL = "LABEL";
goog.dom.TagName.LEGEND = "LEGEND";
goog.dom.TagName.LI = "LI";
goog.dom.TagName.LINK = "LINK";
goog.dom.TagName.MAIN = "MAIN";
goog.dom.TagName.MAP = "MAP";
goog.dom.TagName.MARK = "MARK";
goog.dom.TagName.MATH = "MATH";
goog.dom.TagName.MENU = "MENU";
goog.dom.TagName.MENUITEM = "MENUITEM";
goog.dom.TagName.META = "META";
goog.dom.TagName.METER = "METER";
goog.dom.TagName.NAV = "NAV";
goog.dom.TagName.NOFRAMES = "NOFRAMES";
goog.dom.TagName.NOSCRIPT = "NOSCRIPT";
goog.dom.TagName.OBJECT = "OBJECT";
goog.dom.TagName.OL = "OL";
goog.dom.TagName.OPTGROUP = "OPTGROUP";
goog.dom.TagName.OPTION = "OPTION";
goog.dom.TagName.OUTPUT = "OUTPUT";
goog.dom.TagName.P = "P";
goog.dom.TagName.PARAM = "PARAM";
goog.dom.TagName.PICTURE = "PICTURE";
goog.dom.TagName.PRE = "PRE";
goog.dom.TagName.PROGRESS = "PROGRESS";
goog.dom.TagName.Q = "Q";
goog.dom.TagName.RP = "RP";
goog.dom.TagName.RT = "RT";
goog.dom.TagName.RTC = "RTC";
goog.dom.TagName.RUBY = "RUBY";
goog.dom.TagName.S = "S";
goog.dom.TagName.SAMP = "SAMP";
goog.dom.TagName.SCRIPT = "SCRIPT";
goog.dom.TagName.SECTION = "SECTION";
goog.dom.TagName.SELECT = "SELECT";
goog.dom.TagName.SMALL = "SMALL";
goog.dom.TagName.SOURCE = "SOURCE";
goog.dom.TagName.SPAN = "SPAN";
goog.dom.TagName.STRIKE = "STRIKE";
goog.dom.TagName.STRONG = "STRONG";
goog.dom.TagName.STYLE = "STYLE";
goog.dom.TagName.SUB = "SUB";
goog.dom.TagName.SUMMARY = "SUMMARY";
goog.dom.TagName.SUP = "SUP";
goog.dom.TagName.SVG = "SVG";
goog.dom.TagName.TABLE = "TABLE";
goog.dom.TagName.TBODY = "TBODY";
goog.dom.TagName.TD = "TD";
goog.dom.TagName.TEMPLATE = "TEMPLATE";
goog.dom.TagName.TEXTAREA = "TEXTAREA";
goog.dom.TagName.TFOOT = "TFOOT";
goog.dom.TagName.TH = "TH";
goog.dom.TagName.THEAD = "THEAD";
goog.dom.TagName.TIME = "TIME";
goog.dom.TagName.TITLE = "TITLE";
goog.dom.TagName.TR = "TR";
goog.dom.TagName.TRACK = "TRACK";
goog.dom.TagName.TT = "TT";
goog.dom.TagName.U = "U";
goog.dom.TagName.UL = "UL";
goog.dom.TagName.VAR = "VAR";
goog.dom.TagName.VIDEO = "VIDEO";
goog.dom.TagName.WBR = "WBR";
goog.dom.element = {};
const module$contents$goog$dom$element_HTML_NAMESPACE = "http://www.w3.org/1999/xhtml", module$contents$goog$dom$element_isElement = $value$$ => goog.isObject($value$$) && $value$$.nodeType === goog.dom.NodeType.ELEMENT, module$contents$goog$dom$element_isHtmlElement = $value$$ => goog.isObject($value$$) && module$contents$goog$dom$element_isElement($value$$) && (!$value$$.namespaceURI || $value$$.namespaceURI === module$contents$goog$dom$element_HTML_NAMESPACE), module$contents$goog$dom$element_isHtmlElementOfType =
($value$$, $tagName$$) => goog.isObject($value$$) && module$contents$goog$dom$element_isHtmlElement($value$$) && $value$$.tagName.toUpperCase() === $tagName$$.toString(), module$contents$goog$dom$element_isHtmlAnchorElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.A), module$contents$goog$dom$element_isHtmlButtonElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.BUTTON), module$contents$goog$dom$element_isHtmlLinkElement =
$value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.LINK), module$contents$goog$dom$element_isHtmlImageElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.IMG), module$contents$goog$dom$element_isHtmlAudioElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.AUDIO), module$contents$goog$dom$element_isHtmlVideoElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$,
goog.dom.TagName.VIDEO), module$contents$goog$dom$element_isHtmlInputElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.INPUT), module$contents$goog$dom$element_isHtmlTextAreaElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.TEXTAREA), module$contents$goog$dom$element_isHtmlCanvasElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.CANVAS), module$contents$goog$dom$element_isHtmlEmbedElement =
$value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.EMBED), module$contents$goog$dom$element_isHtmlFormElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.FORM), module$contents$goog$dom$element_isHtmlFrameElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.FRAME), module$contents$goog$dom$element_isHtmlIFrameElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$,
goog.dom.TagName.IFRAME), module$contents$goog$dom$element_isHtmlObjectElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.OBJECT), module$contents$goog$dom$element_isHtmlScriptElement = $value$$ => module$contents$goog$dom$element_isHtmlElementOfType($value$$, goog.dom.TagName.SCRIPT);
goog.dom.element.isElement = module$contents$goog$dom$element_isElement;
goog.dom.element.isHtmlElement = module$contents$goog$dom$element_isHtmlElement;
goog.dom.element.isHtmlElementOfType = module$contents$goog$dom$element_isHtmlElementOfType;
goog.dom.element.isHtmlAnchorElement = module$contents$goog$dom$element_isHtmlAnchorElement;
goog.dom.element.isHtmlButtonElement = module$contents$goog$dom$element_isHtmlButtonElement;
goog.dom.element.isHtmlLinkElement = module$contents$goog$dom$element_isHtmlLinkElement;
goog.dom.element.isHtmlImageElement = module$contents$goog$dom$element_isHtmlImageElement;
goog.dom.element.isHtmlAudioElement = module$contents$goog$dom$element_isHtmlAudioElement;
goog.dom.element.isHtmlVideoElement = module$contents$goog$dom$element_isHtmlVideoElement;
goog.dom.element.isHtmlInputElement = module$contents$goog$dom$element_isHtmlInputElement;
goog.dom.element.isHtmlTextAreaElement = module$contents$goog$dom$element_isHtmlTextAreaElement;
goog.dom.element.isHtmlCanvasElement = module$contents$goog$dom$element_isHtmlCanvasElement;
goog.dom.element.isHtmlEmbedElement = module$contents$goog$dom$element_isHtmlEmbedElement;
goog.dom.element.isHtmlFormElement = module$contents$goog$dom$element_isHtmlFormElement;
goog.dom.element.isHtmlFrameElement = module$contents$goog$dom$element_isHtmlFrameElement;
goog.dom.element.isHtmlIFrameElement = module$contents$goog$dom$element_isHtmlIFrameElement;
goog.dom.element.isHtmlObjectElement = module$contents$goog$dom$element_isHtmlObjectElement;
goog.dom.element.isHtmlScriptElement = module$contents$goog$dom$element_isHtmlScriptElement;
goog.asserts.dom = {};
const module$contents$goog$asserts$dom_assertIsElement = $value$$ => {
  goog.asserts.ENABLE_ASSERTS && !module$contents$goog$dom$element_isElement($value$$) && goog.asserts.fail(`Argument is not an Element; got: ${module$contents$goog$asserts$dom_debugStringForType($value$$)}`);
  return $value$$;
}, module$contents$goog$asserts$dom_assertIsHtmlElement = $value$$ => {
  goog.asserts.ENABLE_ASSERTS && !module$contents$goog$dom$element_isHtmlElement($value$$) && goog.asserts.fail(`Argument is not an HTML Element; got: ${module$contents$goog$asserts$dom_debugStringForType($value$$)}`);
  return $value$$;
}, module$contents$goog$asserts$dom_assertIsHtmlElementOfType = ($value$$, $tagName$$) => {
  goog.asserts.ENABLE_ASSERTS && !module$contents$goog$dom$element_isHtmlElementOfType($value$$, $tagName$$) && goog.asserts.fail("Argument is not an HTML Element with tag name " + `${$tagName$$.toString()}; got: ${module$contents$goog$asserts$dom_debugStringForType($value$$)}`);
  return $value$$;
}, module$contents$goog$asserts$dom_assertIsHtmlAnchorElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.A), module$contents$goog$asserts$dom_assertIsHtmlButtonElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.BUTTON), module$contents$goog$asserts$dom_assertIsHtmlLinkElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.LINK), module$contents$goog$asserts$dom_assertIsHtmlImageElement =
$value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.IMG), module$contents$goog$asserts$dom_assertIsHtmlAudioElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.AUDIO), module$contents$goog$asserts$dom_assertIsHtmlVideoElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.VIDEO), module$contents$goog$asserts$dom_assertIsHtmlInputElement = $value$$ =>
module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.INPUT), module$contents$goog$asserts$dom_assertIsHtmlTextAreaElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.TEXTAREA), module$contents$goog$asserts$dom_assertIsHtmlCanvasElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.CANVAS), module$contents$goog$asserts$dom_assertIsHtmlEmbedElement = $value$$ =>
module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.EMBED), module$contents$goog$asserts$dom_assertIsHtmlFormElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.FORM), module$contents$goog$asserts$dom_assertIsHtmlFrameElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.FRAME), module$contents$goog$asserts$dom_assertIsHtmlIFrameElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$,
goog.dom.TagName.IFRAME), module$contents$goog$asserts$dom_assertIsHtmlObjectElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.OBJECT), module$contents$goog$asserts$dom_assertIsHtmlScriptElement = $value$$ => module$contents$goog$asserts$dom_assertIsHtmlElementOfType($value$$, goog.dom.TagName.SCRIPT), module$contents$goog$asserts$dom_debugStringForType = $value$$ => {
  if (goog.isObject($value$$)) {
    try {
      return $value$$.constructor.displayName || $value$$.constructor.name || Object.prototype.toString.call($value$$);
    } catch ($e$$) {
      return "<object could not be stringified>";
    }
  } else {
    return void 0 === $value$$ ? "undefined" : null === $value$$ ? "null" : typeof $value$$;
  }
};
goog.asserts.dom.assertIsElement = module$contents$goog$asserts$dom_assertIsElement;
goog.asserts.dom.assertIsHtmlElement = module$contents$goog$asserts$dom_assertIsHtmlElement;
goog.asserts.dom.assertIsHtmlElementOfType = module$contents$goog$asserts$dom_assertIsHtmlElementOfType;
goog.asserts.dom.assertIsHtmlAnchorElement = module$contents$goog$asserts$dom_assertIsHtmlAnchorElement;
goog.asserts.dom.assertIsHtmlButtonElement = module$contents$goog$asserts$dom_assertIsHtmlButtonElement;
goog.asserts.dom.assertIsHtmlLinkElement = module$contents$goog$asserts$dom_assertIsHtmlLinkElement;
goog.asserts.dom.assertIsHtmlImageElement = module$contents$goog$asserts$dom_assertIsHtmlImageElement;
goog.asserts.dom.assertIsHtmlAudioElement = module$contents$goog$asserts$dom_assertIsHtmlAudioElement;
goog.asserts.dom.assertIsHtmlVideoElement = module$contents$goog$asserts$dom_assertIsHtmlVideoElement;
goog.asserts.dom.assertIsHtmlInputElement = module$contents$goog$asserts$dom_assertIsHtmlInputElement;
goog.asserts.dom.assertIsHtmlTextAreaElement = module$contents$goog$asserts$dom_assertIsHtmlTextAreaElement;
goog.asserts.dom.assertIsHtmlCanvasElement = module$contents$goog$asserts$dom_assertIsHtmlCanvasElement;
goog.asserts.dom.assertIsHtmlEmbedElement = module$contents$goog$asserts$dom_assertIsHtmlEmbedElement;
goog.asserts.dom.assertIsHtmlFormElement = module$contents$goog$asserts$dom_assertIsHtmlFormElement;
goog.asserts.dom.assertIsHtmlFrameElement = module$contents$goog$asserts$dom_assertIsHtmlFrameElement;
goog.asserts.dom.assertIsHtmlIFrameElement = module$contents$goog$asserts$dom_assertIsHtmlIFrameElement;
goog.asserts.dom.assertIsHtmlObjectElement = module$contents$goog$asserts$dom_assertIsHtmlObjectElement;
goog.asserts.dom.assertIsHtmlScriptElement = module$contents$goog$asserts$dom_assertIsHtmlScriptElement;
goog.dom.asserts = {};
goog.dom.asserts.assertIsLocation = function($o$$) {
  if (goog.asserts.ENABLE_ASSERTS) {
    var $win$$ = goog.dom.asserts.getWindow_($o$$);
    $win$$ && (!$o$$ || !($o$$ instanceof $win$$.Location) && $o$$ instanceof $win$$.Element) && goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s", goog.dom.asserts.debugStringForType_($o$$));
  }
  return $o$$;
};
goog.dom.asserts.debugStringForType_ = function($value$$) {
  if (goog.isObject($value$$)) {
    try {
      return $value$$.constructor.displayName || $value$$.constructor.name || Object.prototype.toString.call($value$$);
    } catch ($e$$) {
      return "<object could not be stringified>";
    }
  } else {
    return void 0 === $value$$ ? "undefined" : null === $value$$ ? "null" : typeof $value$$;
  }
};
goog.dom.asserts.getWindow_ = function($o$$) {
  try {
    var $doc$$ = $o$$ && $o$$.ownerDocument, $win$$ = $doc$$ && ($doc$$.defaultView || $doc$$.parentWindow);
    $win$$ = $win$$ || goog.global;
    if ($win$$.Element && $win$$.Location) {
      return $win$$;
    }
  } catch ($ex$$) {
  }
  return null;
};
goog.functions = {};
goog.functions.constant = function($retValue$$) {
  return function() {
    return $retValue$$;
  };
};
goog.functions.FALSE = function() {
  return !1;
};
goog.functions.TRUE = function() {
  return !0;
};
goog.functions.NULL = function() {
  return null;
};
goog.functions.UNDEFINED = function() {
};
goog.functions.EMPTY = goog.functions.UNDEFINED;
goog.functions.identity = function($opt_returnValue$$, $var_args$$) {
  return $opt_returnValue$$;
};
goog.functions.error = function($message$$) {
  return function() {
    throw Error($message$$);
  };
};
goog.functions.fail = function($err$$) {
  return function() {
    throw $err$$;
  };
};
goog.functions.lock = function($f$$, $opt_numArgs$$) {
  $opt_numArgs$$ = $opt_numArgs$$ || 0;
  return function() {
    return $f$$.apply(this, Array.prototype.slice.call(arguments, 0, $opt_numArgs$$));
  };
};
goog.functions.nth = function($n$$) {
  return function() {
    return arguments[$n$$];
  };
};
goog.functions.partialRight = function($fn$$, $var_args$$) {
  const $rightArgs$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    let $self$$ = this;
    $self$$ === goog.global && ($self$$ = void 0);
    const $newArgs$$ = Array.prototype.slice.call(arguments);
    $newArgs$$.push.apply($newArgs$$, $rightArgs$$);
    return $fn$$.apply($self$$, $newArgs$$);
  };
};
goog.functions.withReturnValue = function($f$$, $retValue$$) {
  return goog.functions.sequence($f$$, goog.functions.constant($retValue$$));
};
goog.functions.equalTo = function($value$$, $opt_useLooseComparison$$) {
  return function($other$$) {
    return $opt_useLooseComparison$$ ? $value$$ == $other$$ : $value$$ === $other$$;
  };
};
goog.functions.compose = function($fn$$, $var_args$$) {
  const $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    let $result$$;
    $length$$ && ($result$$ = $functions$$[$length$$ - 1].apply(this, arguments));
    for (let $i$$ = $length$$ - 2; 0 <= $i$$; $i$$--) {
      $result$$ = $functions$$[$i$$].call(this, $result$$);
    }
    return $result$$;
  };
};
goog.functions.sequence = function($var_args$$) {
  const $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    let $result$$;
    for (let $i$$ = 0; $i$$ < $length$$; $i$$++) {
      $result$$ = $functions$$[$i$$].apply(this, arguments);
    }
    return $result$$;
  };
};
goog.functions.and = function($var_args$$) {
  const $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    for (let $i$$ = 0; $i$$ < $length$$; $i$$++) {
      if (!$functions$$[$i$$].apply(this, arguments)) {
        return !1;
      }
    }
    return !0;
  };
};
goog.functions.or = function($var_args$$) {
  const $functions$$ = arguments, $length$$ = $functions$$.length;
  return function() {
    for (let $i$$ = 0; $i$$ < $length$$; $i$$++) {
      if ($functions$$[$i$$].apply(this, arguments)) {
        return !0;
      }
    }
    return !1;
  };
};
goog.functions.not = function($f$$) {
  return function() {
    return !$f$$.apply(this, arguments);
  };
};
goog.functions.create = function($constructor$$, $var_args$$) {
  var $obj$$ = function() {
  };
  $obj$$.prototype = $constructor$$.prototype;
  $obj$$ = new $obj$$();
  $constructor$$.apply($obj$$, Array.prototype.slice.call(arguments, 1));
  return $obj$$;
};
goog.functions.CACHE_RETURN_VALUE = !0;
goog.functions.cacheReturnValue = function($fn$$) {
  let $called$$ = !1, $value$$;
  return function() {
    if (!goog.functions.CACHE_RETURN_VALUE) {
      return $fn$$();
    }
    $called$$ || ($value$$ = $fn$$(), $called$$ = !0);
    return $value$$;
  };
};
goog.functions.once = function($f$$) {
  let $inner$$ = $f$$;
  return function() {
    if ($inner$$) {
      const $tmp$$ = $inner$$;
      $inner$$ = null;
      $tmp$$();
    }
  };
};
goog.functions.debounce = function($f$$, $interval$$, $opt_scope$$) {
  let $timeout$$ = 0;
  return function($var_args$$) {
    goog.global.clearTimeout($timeout$$);
    const $args$$ = arguments;
    $timeout$$ = goog.global.setTimeout(function() {
      $f$$.apply($opt_scope$$, $args$$);
    }, $interval$$);
  };
};
goog.functions.throttle = function($f$$, $interval$$, $opt_scope$$) {
  let $timeout$$ = 0, $shouldFire$$ = !1, $storedArgs$$ = [];
  const $handleTimeout$$ = function() {
    $timeout$$ = 0;
    $shouldFire$$ && ($shouldFire$$ = !1, $fire$$());
  }, $fire$$ = function() {
    $timeout$$ = goog.global.setTimeout($handleTimeout$$, $interval$$);
    let $args$$ = $storedArgs$$;
    $storedArgs$$ = [];
    $f$$.apply($opt_scope$$, $args$$);
  };
  return function($var_args$$) {
    $storedArgs$$ = arguments;
    $timeout$$ ? $shouldFire$$ = !0 : $fire$$();
  };
};
goog.functions.rateLimit = function($f$$, $interval$$, $opt_scope$$) {
  let $timeout$$ = 0;
  const $handleTimeout$$ = function() {
    $timeout$$ = 0;
  };
  return function($var_args$$) {
    $timeout$$ || ($timeout$$ = goog.global.setTimeout($handleTimeout$$, $interval$$), $f$$.apply($opt_scope$$, arguments));
  };
};
goog.functions.isFunction = $val$$ => "function" === typeof $val$$;
goog.string = {};
goog.string.TypedString = function() {
};
goog.string.Const = function($opt_token$$, $opt_content$$) {
  this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ = $opt_token$$ === goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ && $opt_content$$ || "";
  this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ = goog.string.Const.TYPE_MARKER_;
};
goog.string.Const.prototype.implementsGoogStringTypedString = !0;
goog.string.Const.prototype.getTypedStringValue = function() {
  return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
};
goog.DEBUG && (goog.string.Const.prototype.toString = function() {
  return "Const{" + this.stringConstValueWithSecurityContract__googStringSecurityPrivate_ + "}";
});
goog.string.Const.unwrap = function($stringConst$$) {
  if ($stringConst$$ instanceof goog.string.Const && $stringConst$$.constructor === goog.string.Const && $stringConst$$.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_ === goog.string.Const.TYPE_MARKER_) {
    return $stringConst$$.stringConstValueWithSecurityContract__googStringSecurityPrivate_;
  }
  goog.asserts.fail("expected object of type Const, got '" + $stringConst$$ + "'");
  return "type_error:Const";
};
goog.string.Const.from = function($s$$) {
  return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_, $s$$);
};
goog.string.Const.TYPE_MARKER_ = {};
goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.string.Const.EMPTY = goog.string.Const.from("");
goog.html = {};
goog.html.trustedtypes = {};
goog.html.trustedtypes.POLICY_NAME = goog.TRUSTED_TYPES_POLICY_NAME ? goog.TRUSTED_TYPES_POLICY_NAME + "#html" : "";
goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse = function() {
  if (!goog.html.trustedtypes.POLICY_NAME) {
    return null;
  }
  void 0 === goog.html.trustedtypes.cachedPolicy_ && (goog.html.trustedtypes.cachedPolicy_ = goog.createTrustedTypesPolicy(goog.html.trustedtypes.POLICY_NAME));
  return goog.html.trustedtypes.cachedPolicy_;
};
const module$contents$goog$html$SafeScript_CONSTRUCTOR_TOKEN_PRIVATE = {};
class module$contents$goog$html$SafeScript_SafeScript {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== module$contents$goog$html$SafeScript_CONSTRUCTOR_TOKEN_PRIVATE) {
      throw Error("SafeScript is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseSafeScriptWrappedValue_ = $value$$;
    this.implementsGoogStringTypedString = !0;
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
  }
  static fromConstant($script$$) {
    $script$$ = goog.string.Const.unwrap($script$$);
    return 0 === $script$$.length ? module$contents$goog$html$SafeScript_SafeScript.EMPTY : module$contents$goog$html$SafeScript_SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse($script$$);
  }
  static fromJson($val$$) {
    return module$contents$goog$html$SafeScript_SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(module$contents$goog$html$SafeScript_SafeScript.stringify_($val$$));
  }
  getTypedStringValue() {
    return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString();
  }
  static unwrap($safeScript$$) {
    return module$contents$goog$html$SafeScript_SafeScript.unwrapTrustedScript($safeScript$$).toString();
  }
  static unwrapTrustedScript($safeScript$$) {
    if ($safeScript$$ instanceof module$contents$goog$html$SafeScript_SafeScript && $safeScript$$.constructor === module$contents$goog$html$SafeScript_SafeScript) {
      return $safeScript$$.privateDoNotAccessOrElseSafeScriptWrappedValue_;
    }
    (0,goog.asserts.fail)("expected object of type SafeScript, got '" + $safeScript$$ + "' of type " + goog.typeOf($safeScript$$));
    return "type_error:SafeScript";
  }
  static stringify_($val$$) {
    return JSON.stringify($val$$).replace(/</g, "\\x3c");
  }
  static createSafeScriptSecurityPrivateDoNotAccessOrElse($noinlineScript_script$$) {
    const $policy$$ = goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    $noinlineScript_script$$ = $policy$$ ? $policy$$.createScript($noinlineScript_script$$) : $noinlineScript_script$$;
    return new module$contents$goog$html$SafeScript_SafeScript($noinlineScript_script$$, module$contents$goog$html$SafeScript_CONSTRUCTOR_TOKEN_PRIVATE);
  }
}
module$contents$goog$html$SafeScript_SafeScript.EMPTY = function() {
  return module$contents$goog$html$SafeScript_SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");
}();
goog.html.SafeScript = module$contents$goog$html$SafeScript_SafeScript;
goog.fs = {};
goog.fs.url = {};
goog.fs.url.createObjectUrl = function($obj$$) {
  return goog.fs.url.getUrlObject_().createObjectURL($obj$$);
};
goog.fs.url.revokeObjectUrl = function($url$$) {
  goog.fs.url.getUrlObject_().revokeObjectURL($url$$);
};
goog.fs.url.UrlObject_ = function() {
};
goog.fs.url.UrlObject_.prototype.createObjectURL = function($arg$$) {
};
goog.fs.url.UrlObject_.prototype.revokeObjectURL = function($s$$) {
};
goog.fs.url.getUrlObject_ = function() {
  const $urlObject$$ = goog.fs.url.findUrlObject_();
  if (null != $urlObject$$) {
    return $urlObject$$;
  }
  throw Error("This browser doesn't seem to support blob URLs");
};
goog.fs.url.findUrlObject_ = function() {
  return void 0 !== goog.global.URL && void 0 !== goog.global.URL.createObjectURL ? goog.global.URL : void 0 !== goog.global.createObjectURL ? goog.global : null;
};
goog.fs.url.browserSupportsObjectUrls = function() {
  return null != goog.fs.url.findUrlObject_();
};
goog.fs.blob = {};
goog.fs.blob.getBlob = function($var_args$$) {
  var $BlobBuilder$$ = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
  if (void 0 !== $BlobBuilder$$) {
    $BlobBuilder$$ = new $BlobBuilder$$();
    for (let $i$$ = 0; $i$$ < arguments.length; $i$$++) {
      $BlobBuilder$$.append(arguments[$i$$]);
    }
    return $BlobBuilder$$.getBlob();
  }
  return goog.fs.blob.getBlobWithProperties(Array.prototype.slice.call(arguments));
};
goog.fs.blob.getBlobWithProperties = function($parts$$, $opt_type$$, $opt_endings$$) {
  var $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$ = goog.global.BlobBuilder || goog.global.WebKitBlobBuilder;
  if (void 0 !== $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$) {
    $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$ = new $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$();
    for (let $i$$ = 0; $i$$ < $parts$$.length; $i$$++) {
      $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$.append($parts$$[$i$$], $opt_endings$$);
    }
    return $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$.getBlob($opt_type$$);
  }
  if (void 0 !== goog.global.Blob) {
    return $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$ = {}, $opt_type$$ && ($BlobBuilder$jscomp$2_bb$jscomp$1_properties$$.type = $opt_type$$), $opt_endings$$ && ($BlobBuilder$jscomp$2_bb$jscomp$1_properties$$.endings = $opt_endings$$), new Blob($parts$$, $BlobBuilder$jscomp$2_bb$jscomp$1_properties$$);
  }
  throw Error("This browser doesn't seem to support creating Blobs");
};
goog.html.TrustedResourceUrl = class {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_) {
      throw Error("TrustedResourceUrl is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ = $value$$;
  }
  toString() {
    return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_ + "";
  }
};
goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.TrustedResourceUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString();
};
goog.html.TrustedResourceUrl.prototype.cloneWithParams = function($searchParams$$, $opt_hashParams$$) {
  var $parts$jscomp$4_url$$ = goog.html.TrustedResourceUrl.unwrap(this);
  $parts$jscomp$4_url$$ = goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec($parts$jscomp$4_url$$);
  var $urlHash$$ = $parts$jscomp$4_url$$[3] || "";
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse($parts$jscomp$4_url$$[1] + goog.html.TrustedResourceUrl.stringifyParams_("?", $parts$jscomp$4_url$$[2] || "", $searchParams$$) + goog.html.TrustedResourceUrl.stringifyParams_("#", $urlHash$$, $opt_hashParams$$));
};
goog.html.TrustedResourceUrl.unwrap = function($trustedResourceUrl$$) {
  return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL($trustedResourceUrl$$).toString();
};
goog.html.TrustedResourceUrl.unwrapTrustedScriptURL = function($trustedResourceUrl$$) {
  if ($trustedResourceUrl$$ instanceof goog.html.TrustedResourceUrl && $trustedResourceUrl$$.constructor === goog.html.TrustedResourceUrl) {
    return $trustedResourceUrl$$.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type TrustedResourceUrl, got '" + $trustedResourceUrl$$ + "' of type " + goog.typeOf($trustedResourceUrl$$));
  return "type_error:TrustedResourceUrl";
};
goog.html.TrustedResourceUrl.format = function($format$jscomp$19_result$$, $args$$) {
  var $formatStr$$ = goog.string.Const.unwrap($format$jscomp$19_result$$);
  if (!goog.html.TrustedResourceUrl.BASE_URL_.test($formatStr$$)) {
    throw Error("Invalid TrustedResourceUrl format: " + $formatStr$$);
  }
  $format$jscomp$19_result$$ = $formatStr$$.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_, function($arg$jscomp$9_match$$, $id$$) {
    if (!Object.prototype.hasOwnProperty.call($args$$, $id$$)) {
      throw Error('Found marker, "' + $id$$ + '", in format string, "' + $formatStr$$ + '", but no valid label mapping found in args: ' + JSON.stringify($args$$));
    }
    $arg$jscomp$9_match$$ = $args$$[$id$$];
    return $arg$jscomp$9_match$$ instanceof goog.string.Const ? goog.string.Const.unwrap($arg$jscomp$9_match$$) : encodeURIComponent(String($arg$jscomp$9_match$$));
  });
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse($format$jscomp$19_result$$);
};
goog.html.TrustedResourceUrl.FORMAT_MARKER_ = /%{(\w+)}/g;
goog.html.TrustedResourceUrl.BASE_URL_ = RegExp("^((https:)?//[0-9a-z.:[\\]-]+/|/[^/\\\\]|[^:/\\\\%]+/|[^:/\\\\%]*[?#]|about:blank#)", "i");
goog.html.TrustedResourceUrl.URL_PARAM_PARSER_ = /^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
goog.html.TrustedResourceUrl.formatWithParams = function($format$$, $args$$, $searchParams$$, $opt_hashParams$$) {
  return goog.html.TrustedResourceUrl.format($format$$, $args$$).cloneWithParams($searchParams$$, $opt_hashParams$$);
};
goog.html.TrustedResourceUrl.fromConstant = function($url$$) {
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap($url$$));
};
goog.html.TrustedResourceUrl.fromConstants = function($parts$$) {
  for (var $unwrapped$$ = "", $i$$ = 0; $i$$ < $parts$$.length; $i$$++) {
    $unwrapped$$ += goog.string.Const.unwrap($parts$$[$i$$]);
  }
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse($unwrapped$$);
};
goog.html.TrustedResourceUrl.fromSafeScript = function($blob$jscomp$12_safeScript$jscomp$2_url$$) {
  $blob$jscomp$12_safeScript$jscomp$2_url$$ = goog.fs.blob.getBlobWithProperties([module$contents$goog$html$SafeScript_SafeScript.unwrap($blob$jscomp$12_safeScript$jscomp$2_url$$)], "text/javascript");
  $blob$jscomp$12_safeScript$jscomp$2_url$$ = goog.fs.url.createObjectUrl($blob$jscomp$12_safeScript$jscomp$2_url$$);
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse($blob$jscomp$12_safeScript$jscomp$2_url$$);
};
goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse = function($noinlineUrl_url$jscomp$29_value$$) {
  const $policy$$ = goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse();
  $noinlineUrl_url$jscomp$29_value$$ = $policy$$ ? $policy$$.createScriptURL($noinlineUrl_url$jscomp$29_value$$) : $noinlineUrl_url$jscomp$29_value$$;
  return new goog.html.TrustedResourceUrl($noinlineUrl_url$jscomp$29_value$$, goog.html.TrustedResourceUrl.CONSTRUCTOR_TOKEN_PRIVATE_);
};
goog.html.TrustedResourceUrl.stringifyParams_ = function($prefix$$, $currentString$$, $params$$) {
  if (null == $params$$) {
    return $currentString$$;
  }
  if ("string" === typeof $params$$) {
    return $params$$ ? $prefix$$ + encodeURIComponent($params$$) : "";
  }
  for (var $key$$ in $params$$) {
    if (Object.prototype.hasOwnProperty.call($params$$, $key$$)) {
      var $outputValues_value$$ = $params$$[$key$$];
      $outputValues_value$$ = Array.isArray($outputValues_value$$) ? $outputValues_value$$ : [$outputValues_value$$];
      for (var $i$$ = 0; $i$$ < $outputValues_value$$.length; $i$$++) {
        var $outputValue$$ = $outputValues_value$$[$i$$];
        null != $outputValue$$ && ($currentString$$ ||= $prefix$$, $currentString$$ += ($currentString$$.length > $prefix$$.length ? "&" : "") + encodeURIComponent($key$$) + "=" + encodeURIComponent(String($outputValue$$)));
      }
    }
  }
  return $currentString$$;
};
goog.string.internal = {};
goog.string.internal.startsWith = function($str$$, $prefix$$) {
  return 0 == $str$$.lastIndexOf($prefix$$, 0);
};
goog.string.internal.endsWith = function($str$$, $suffix$$) {
  const $l$$ = $str$$.length - $suffix$$.length;
  return 0 <= $l$$ && $str$$.indexOf($suffix$$, $l$$) == $l$$;
};
goog.string.internal.caseInsensitiveStartsWith = function($str$$, $prefix$$) {
  return 0 == goog.string.internal.caseInsensitiveCompare($prefix$$, $str$$.slice(0, $prefix$$.length));
};
goog.string.internal.caseInsensitiveEndsWith = function($str$$, $suffix$$) {
  return 0 == goog.string.internal.caseInsensitiveCompare($suffix$$, $str$$.slice($str$$.length - $suffix$$.length));
};
goog.string.internal.caseInsensitiveEquals = function($str1$$, $str2$$) {
  return $str1$$.toLowerCase() == $str2$$.toLowerCase();
};
goog.string.internal.isEmptyOrWhitespace = function($str$$) {
  return /^[\s\xa0]*$/.test($str$$);
};
goog.string.internal.trim = goog.TRUSTED_SITE && String.prototype.trim ? function($str$$) {
  return $str$$.trim();
} : function($str$$) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec($str$$)[1];
};
goog.string.internal.caseInsensitiveCompare = function($str1$$, $str2$$) {
  $str1$$ = String($str1$$).toLowerCase();
  $str2$$ = String($str2$$).toLowerCase();
  return $str1$$ < $str2$$ ? -1 : $str1$$ == $str2$$ ? 0 : 1;
};
goog.string.internal.newLineToBr = function($str$$, $opt_xml$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>");
};
goog.string.internal.htmlEscape = function($str$$, $opt_isLikelyToContainHtmlChars$$) {
  if ($opt_isLikelyToContainHtmlChars$$) {
    $str$$ = $str$$.replace(goog.string.internal.AMP_RE_, "&amp;").replace(goog.string.internal.LT_RE_, "&lt;").replace(goog.string.internal.GT_RE_, "&gt;").replace(goog.string.internal.QUOT_RE_, "&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.internal.NULL_RE_, "&#0;");
  } else {
    if (!goog.string.internal.ALL_RE_.test($str$$)) {
      return $str$$;
    }
    -1 != $str$$.indexOf("&") && ($str$$ = $str$$.replace(goog.string.internal.AMP_RE_, "&amp;"));
    -1 != $str$$.indexOf("<") && ($str$$ = $str$$.replace(goog.string.internal.LT_RE_, "&lt;"));
    -1 != $str$$.indexOf(">") && ($str$$ = $str$$.replace(goog.string.internal.GT_RE_, "&gt;"));
    -1 != $str$$.indexOf('"') && ($str$$ = $str$$.replace(goog.string.internal.QUOT_RE_, "&quot;"));
    -1 != $str$$.indexOf("'") && ($str$$ = $str$$.replace(goog.string.internal.SINGLE_QUOTE_RE_, "&#39;"));
    -1 != $str$$.indexOf("\x00") && ($str$$ = $str$$.replace(goog.string.internal.NULL_RE_, "&#0;"));
  }
  return $str$$;
};
goog.string.internal.AMP_RE_ = /&/g;
goog.string.internal.LT_RE_ = /</g;
goog.string.internal.GT_RE_ = />/g;
goog.string.internal.QUOT_RE_ = /"/g;
goog.string.internal.SINGLE_QUOTE_RE_ = /'/g;
goog.string.internal.NULL_RE_ = /\x00/g;
goog.string.internal.ALL_RE_ = /[\x00&<>"']/;
goog.string.internal.whitespaceEscape = function($str$$, $opt_xml$$) {
  return goog.string.internal.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$);
};
goog.string.internal.contains = function($str$$, $subString$$) {
  return -1 != $str$$.indexOf($subString$$);
};
goog.string.internal.caseInsensitiveContains = function($str$$, $subString$$) {
  return goog.string.internal.contains($str$$.toLowerCase(), $subString$$.toLowerCase());
};
goog.string.internal.compareVersions = function($v1Subs_version1$$, $v2Subs_version2$$) {
  var $order_v1CompNum$$ = 0;
  $v1Subs_version1$$ = goog.string.internal.trim(String($v1Subs_version1$$)).split(".");
  $v2Subs_version2$$ = goog.string.internal.trim(String($v2Subs_version2$$)).split(".");
  const $subCount$$ = Math.max($v1Subs_version1$$.length, $v2Subs_version2$$.length);
  for (let $subIdx$$ = 0; 0 == $order_v1CompNum$$ && $subIdx$$ < $subCount$$; $subIdx$$++) {
    var $v1Comp_v1Sub$$ = $v1Subs_version1$$[$subIdx$$] || "", $v2Comp_v2Sub$$ = $v2Subs_version2$$[$subIdx$$] || "";
    do {
      $v1Comp_v1Sub$$ = /(\d*)(\D*)(.*)/.exec($v1Comp_v1Sub$$) || ["", "", "", ""];
      $v2Comp_v2Sub$$ = /(\d*)(\D*)(.*)/.exec($v2Comp_v2Sub$$) || ["", "", "", ""];
      if (0 == $v1Comp_v1Sub$$[0].length && 0 == $v2Comp_v2Sub$$[0].length) {
        break;
      }
      $order_v1CompNum$$ = 0 == $v1Comp_v1Sub$$[1].length ? 0 : parseInt($v1Comp_v1Sub$$[1], 10);
      const $v2CompNum$$ = 0 == $v2Comp_v2Sub$$[1].length ? 0 : parseInt($v2Comp_v2Sub$$[1], 10);
      $order_v1CompNum$$ = goog.string.internal.compareElements_($order_v1CompNum$$, $v2CompNum$$) || goog.string.internal.compareElements_(0 == $v1Comp_v1Sub$$[2].length, 0 == $v2Comp_v2Sub$$[2].length) || goog.string.internal.compareElements_($v1Comp_v1Sub$$[2], $v2Comp_v2Sub$$[2]);
      $v1Comp_v1Sub$$ = $v1Comp_v1Sub$$[3];
      $v2Comp_v2Sub$$ = $v2Comp_v2Sub$$[3];
    } while (0 == $order_v1CompNum$$);
  }
  return $order_v1CompNum$$;
};
goog.string.internal.compareElements_ = function($left$$, $right$$) {
  return $left$$ < $right$$ ? -1 : $left$$ > $right$$ ? 1 : 0;
};
goog.html.SafeUrl = class {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_) {
      throw Error("SafeUrl is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseSafeUrlWrappedValue_ = $value$$;
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
  }
};
goog.html.SafeUrl.INNOCUOUS_STRING = "about:invalid#zClosurez";
goog.html.SafeUrl.prototype.implementsGoogStringTypedString = !0;
goog.html.SafeUrl.prototype.getTypedStringValue = function() {
  return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString();
};
goog.html.SafeUrl.unwrap = function($safeUrl$$) {
  if ($safeUrl$$ instanceof goog.html.SafeUrl && $safeUrl$$.constructor === goog.html.SafeUrl) {
    return $safeUrl$$.privateDoNotAccessOrElseSafeUrlWrappedValue_;
  }
  goog.asserts.fail("expected object of type SafeUrl, got '" + $safeUrl$$ + "' of type " + goog.typeOf($safeUrl$$));
  return "type_error:SafeUrl";
};
goog.html.SafeUrl.fromConstant = function($url$$) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap($url$$));
};
goog.html.SAFE_MIME_TYPE_PATTERN_ = RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon|heic|heif)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$', "i");
goog.html.SafeUrl.isSafeMimeType = function($mimeType$$) {
  return goog.html.SAFE_MIME_TYPE_PATTERN_.test($mimeType$$);
};
goog.html.SafeUrl.fromBlob = function($blob$jscomp$13_url$$) {
  $blob$jscomp$13_url$$ = goog.html.SafeUrl.isSafeMimeType($blob$jscomp$13_url$$.type) ? goog.fs.url.createObjectUrl($blob$jscomp$13_url$$) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($blob$jscomp$13_url$$);
};
goog.html.SafeUrl.revokeObjectUrl = function($safeUrl$jscomp$1_url$$) {
  $safeUrl$jscomp$1_url$$ = $safeUrl$jscomp$1_url$$.getTypedStringValue();
  $safeUrl$jscomp$1_url$$ !== goog.html.SafeUrl.INNOCUOUS_STRING && goog.fs.url.revokeObjectUrl($safeUrl$jscomp$1_url$$);
};
goog.html.SafeUrl.fromMediaSource = function($mediaSource_url$$) {
  goog.asserts.assert("MediaSource" in goog.global, "No support for MediaSource");
  $mediaSource_url$$ = $mediaSource_url$$ instanceof MediaSource ? goog.fs.url.createObjectUrl($mediaSource_url$$) : goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($mediaSource_url$$);
};
goog.html.DATA_URL_PATTERN_ = /^data:(.*);base64,[a-z0-9+\/]+=*$/i;
goog.html.SafeUrl.tryFromDataUrl = function($dataUrl_filteredDataUrl$$) {
  $dataUrl_filteredDataUrl$$ = String($dataUrl_filteredDataUrl$$);
  $dataUrl_filteredDataUrl$$ = $dataUrl_filteredDataUrl$$.replace(/(%0A|%0D)/g, "");
  return $dataUrl_filteredDataUrl$$.match(goog.html.DATA_URL_PATTERN_) ? goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($dataUrl_filteredDataUrl$$) : null;
};
goog.html.SafeUrl.fromDataUrl = function($dataUrl$$) {
  return goog.html.SafeUrl.tryFromDataUrl($dataUrl$$) || goog.html.SafeUrl.INNOCUOUS_URL;
};
goog.html.SafeUrl.fromTelUrl = function($telUrl$$) {
  goog.string.internal.caseInsensitiveStartsWith($telUrl$$, "tel:") || ($telUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($telUrl$$);
};
goog.html.SIP_URL_PATTERN_ = RegExp("^sip[s]?:[+a-z0-9_.!$%&'*\\/=^`{|}~-]+@([a-z0-9-]+\\.)+[a-z0-9]{2,63}$", "i");
goog.html.SafeUrl.fromSipUrl = function($sipUrl$$) {
  goog.html.SIP_URL_PATTERN_.test(decodeURIComponent($sipUrl$$)) || ($sipUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($sipUrl$$);
};
goog.html.SafeUrl.fromFacebookMessengerUrl = function($facebookMessengerUrl$$) {
  goog.string.internal.caseInsensitiveStartsWith($facebookMessengerUrl$$, "fb-messenger://share") || ($facebookMessengerUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($facebookMessengerUrl$$);
};
goog.html.SafeUrl.fromWhatsAppUrl = function($whatsAppUrl$$) {
  goog.string.internal.caseInsensitiveStartsWith($whatsAppUrl$$, "whatsapp://send") || ($whatsAppUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($whatsAppUrl$$);
};
goog.html.SafeUrl.fromSmsUrl = function($smsUrl$$) {
  goog.string.internal.caseInsensitiveStartsWith($smsUrl$$, "sms:") && goog.html.SafeUrl.isSmsUrlBodyValid_($smsUrl$$) || ($smsUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($smsUrl$$);
};
goog.html.SafeUrl.isSmsUrlBodyValid_ = function($bodyValue_smsUrl$$) {
  var $bodyParams_hash$$ = $bodyValue_smsUrl$$.indexOf("#");
  0 < $bodyParams_hash$$ && ($bodyValue_smsUrl$$ = $bodyValue_smsUrl$$.substring(0, $bodyParams_hash$$));
  $bodyParams_hash$$ = $bodyValue_smsUrl$$.match(/[?&]body=/gi);
  if (!$bodyParams_hash$$) {
    return !0;
  }
  if (1 < $bodyParams_hash$$.length) {
    return !1;
  }
  $bodyValue_smsUrl$$ = $bodyValue_smsUrl$$.match(/[?&]body=([^&]*)/)[1];
  if (!$bodyValue_smsUrl$$) {
    return !0;
  }
  try {
    decodeURIComponent($bodyValue_smsUrl$$);
  } catch ($error$$) {
    return !1;
  }
  return /^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test($bodyValue_smsUrl$$);
};
goog.html.SafeUrl.fromSshUrl = function($sshUrl$$) {
  goog.string.internal.caseInsensitiveStartsWith($sshUrl$$, "ssh://") || ($sshUrl$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($sshUrl$$);
};
goog.html.SafeUrl.sanitizeChromeExtensionUrl = function($url$$, $extensionId$$) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//, $url$$, $extensionId$$);
};
goog.html.SafeUrl.sanitizeFirefoxExtensionUrl = function($url$$, $extensionId$$) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//, $url$$, $extensionId$$);
};
goog.html.SafeUrl.sanitizeEdgeExtensionUrl = function($url$$, $extensionId$$) {
  return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//, $url$$, $extensionId$$);
};
goog.html.SafeUrl.sanitizeExtensionUrl_ = function($extractedExtensionId_matches_scheme$$, $url$$, $extensionId$$) {
  ($extractedExtensionId_matches_scheme$$ = $extractedExtensionId_matches_scheme$$.exec($url$$)) ? ($extractedExtensionId_matches_scheme$$ = $extractedExtensionId_matches_scheme$$[1], -1 == ($extensionId$$ instanceof goog.string.Const ? [goog.string.Const.unwrap($extensionId$$)] : $extensionId$$.map(function($x$$) {
    return goog.string.Const.unwrap($x$$);
  })).indexOf($extractedExtensionId_matches_scheme$$) && ($url$$ = goog.html.SafeUrl.INNOCUOUS_STRING)) : $url$$ = goog.html.SafeUrl.INNOCUOUS_STRING;
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($url$$);
};
goog.html.SafeUrl.fromTrustedResourceUrl = function($trustedResourceUrl$$) {
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap($trustedResourceUrl$$));
};
goog.html.SAFE_URL_PATTERN_ = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
goog.html.SafeUrl.SAFE_URL_PATTERN = goog.html.SAFE_URL_PATTERN_;
goog.html.SafeUrl.trySanitize = function($url$$) {
  if ($url$$ instanceof goog.html.SafeUrl) {
    return $url$$;
  }
  $url$$ = "object" == typeof $url$$ && $url$$.implementsGoogStringTypedString ? $url$$.getTypedStringValue() : String($url$$);
  return goog.html.SAFE_URL_PATTERN_.test($url$$) ? goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($url$$) : goog.html.SafeUrl.tryFromDataUrl($url$$);
};
goog.html.SafeUrl.sanitize = function($url$$) {
  return goog.html.SafeUrl.trySanitize($url$$) || goog.html.SafeUrl.INNOCUOUS_URL;
};
goog.html.SafeUrl.sanitizeAssertUnchanged = function($url$$, $opt_allowDataUrl_safeUrl$$) {
  if ($url$$ instanceof goog.html.SafeUrl) {
    return $url$$;
  }
  $url$$ = "object" == typeof $url$$ && $url$$.implementsGoogStringTypedString ? $url$$.getTypedStringValue() : String($url$$);
  if ($opt_allowDataUrl_safeUrl$$ && /^data:/i.test($url$$) && ($opt_allowDataUrl_safeUrl$$ = goog.html.SafeUrl.fromDataUrl($url$$), $opt_allowDataUrl_safeUrl$$.getTypedStringValue() == $url$$)) {
    return $opt_allowDataUrl_safeUrl$$;
  }
  goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test($url$$), "%s does not match the safe URL pattern", $url$$) || ($url$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($url$$);
};
goog.html.SafeUrl.extractScheme = function($url$$) {
  let $parsedUrl$$;
  try {
    $parsedUrl$$ = new URL($url$$);
  } catch ($e$$) {
    return "https:";
  }
  return $parsedUrl$$.protocol;
};
goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged = function($url$$) {
  if ($url$$ instanceof goog.html.SafeUrl) {
    return $url$$;
  }
  $url$$ = "object" == typeof $url$$ && $url$$.implementsGoogStringTypedString ? $url$$.getTypedStringValue() : String($url$$);
  const $parsedScheme$$ = goog.html.SafeUrl.extractScheme($url$$);
  goog.asserts.assert("javascript:" !== $parsedScheme$$, "%s is a javascript: URL", $url$$) || ($url$$ = goog.html.SafeUrl.INNOCUOUS_STRING);
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($url$$);
};
goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_ = {};
goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse = function($url$$) {
  return new goog.html.SafeUrl($url$$, goog.html.SafeUrl.CONSTRUCTOR_TOKEN_PRIVATE_);
};
goog.html.SafeUrl.INNOCUOUS_URL = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.SafeUrl.INNOCUOUS_STRING);
goog.html.SafeUrl.ABOUT_BLANK = goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");
const module$contents$goog$html$SafeStyle_CONSTRUCTOR_TOKEN_PRIVATE = {};
class module$contents$goog$html$SafeStyle_SafeStyle {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== module$contents$goog$html$SafeStyle_CONSTRUCTOR_TOKEN_PRIVATE) {
      throw Error("SafeStyle is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseSafeStyleWrappedValue_ = $value$$;
    this.implementsGoogStringTypedString = !0;
  }
  static fromConstant($style$$) {
    $style$$ = goog.string.Const.unwrap($style$$);
    if (0 === $style$$.length) {
      return module$contents$goog$html$SafeStyle_SafeStyle.EMPTY;
    }
    (0,goog.asserts.assert)((0,goog.string.internal.endsWith)($style$$, ";"), `Last character of style string is not ';': ${$style$$}`);
    (0,goog.asserts.assert)((0,goog.string.internal.contains)($style$$, ":"), "Style string must contain at least one ':', to specify a \"name: value\" pair: " + $style$$);
    return module$contents$goog$html$SafeStyle_SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse($style$$);
  }
  getTypedStringValue() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_;
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeStyleWrappedValue_.toString();
  }
  static unwrap($safeStyle$$) {
    if ($safeStyle$$ instanceof module$contents$goog$html$SafeStyle_SafeStyle && $safeStyle$$.constructor === module$contents$goog$html$SafeStyle_SafeStyle) {
      return $safeStyle$$.privateDoNotAccessOrElseSafeStyleWrappedValue_;
    }
    (0,goog.asserts.fail)(`expected object of type SafeStyle, got '${$safeStyle$$}` + "' of type " + goog.typeOf($safeStyle$$));
    return "type_error:SafeStyle";
  }
  static createSafeStyleSecurityPrivateDoNotAccessOrElse($style$$) {
    return new module$contents$goog$html$SafeStyle_SafeStyle($style$$, module$contents$goog$html$SafeStyle_CONSTRUCTOR_TOKEN_PRIVATE);
  }
  static create($map$$) {
    let $style$$ = "";
    for (let $name$$ in $map$$) {
      if (Object.prototype.hasOwnProperty.call($map$$, $name$$)) {
        if (!/^[-_a-zA-Z0-9]+$/.test($name$$)) {
          throw Error(`Name allows only [-_a-zA-Z0-9], got: ${$name$$}`);
        }
        let $value$$ = $map$$[$name$$];
        null != $value$$ && ($value$$ = Array.isArray($value$$) ? $value$$.map(module$contents$goog$html$SafeStyle_sanitizePropertyValue).join(" ") : module$contents$goog$html$SafeStyle_sanitizePropertyValue($value$$), $style$$ += `${$name$$}:${$value$$};`);
      }
    }
    return $style$$ ? module$contents$goog$html$SafeStyle_SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse($style$$) : module$contents$goog$html$SafeStyle_SafeStyle.EMPTY;
  }
  static concat($var_args$$) {
    let $style$$ = "";
    const $addArgument$$ = $argument$$ => {
      Array.isArray($argument$$) ? $argument$$.forEach($addArgument$$) : $style$$ += module$contents$goog$html$SafeStyle_SafeStyle.unwrap($argument$$);
    };
    Array.prototype.forEach.call(arguments, $addArgument$$);
    return $style$$ ? module$contents$goog$html$SafeStyle_SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse($style$$) : module$contents$goog$html$SafeStyle_SafeStyle.EMPTY;
  }
}
module$contents$goog$html$SafeStyle_SafeStyle.EMPTY = module$contents$goog$html$SafeStyle_SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");
module$contents$goog$html$SafeStyle_SafeStyle.INNOCUOUS_STRING = "zClosurez";
function module$contents$goog$html$SafeStyle_sanitizePropertyValue($result$jscomp$9_value$$) {
  if ($result$jscomp$9_value$$ instanceof goog.html.SafeUrl) {
    return 'url("' + goog.html.SafeUrl.unwrap($result$jscomp$9_value$$).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
  }
  $result$jscomp$9_value$$ = $result$jscomp$9_value$$ instanceof goog.string.Const ? goog.string.Const.unwrap($result$jscomp$9_value$$) : module$contents$goog$html$SafeStyle_sanitizePropertyValueString(String($result$jscomp$9_value$$));
  if (/[{;}]/.test($result$jscomp$9_value$$)) {
    throw new module$contents$goog$asserts_AssertionError("Value does not allow [{;}], got: %s.", [$result$jscomp$9_value$$]);
  }
  return $result$jscomp$9_value$$;
}
function module$contents$goog$html$SafeStyle_sanitizePropertyValueString($value$$) {
  const $valueWithoutFunctions$$ = $value$$.replace(module$contents$goog$html$SafeStyle_FUNCTIONS_RE, "$1").replace(module$contents$goog$html$SafeStyle_FUNCTIONS_RE, "$1").replace(module$contents$goog$html$SafeStyle_URL_RE, "url");
  if (module$contents$goog$html$SafeStyle_VALUE_RE.test($valueWithoutFunctions$$)) {
    if (module$contents$goog$html$SafeStyle_COMMENT_RE.test($value$$)) {
      return (0,goog.asserts.fail)(`String value disallows comments, got: ${$value$$}`), module$contents$goog$html$SafeStyle_SafeStyle.INNOCUOUS_STRING;
    }
    if (!module$contents$goog$html$SafeStyle_hasBalancedQuotes($value$$)) {
      return (0,goog.asserts.fail)(`String value requires balanced quotes, got: ${$value$$}`), module$contents$goog$html$SafeStyle_SafeStyle.INNOCUOUS_STRING;
    }
    if (!module$contents$goog$html$SafeStyle_hasBalancedSquareBrackets($value$$)) {
      return (0,goog.asserts.fail)("String value requires balanced square brackets and one identifier per pair of brackets, got: " + $value$$), module$contents$goog$html$SafeStyle_SafeStyle.INNOCUOUS_STRING;
    }
  } else {
    return (0,goog.asserts.fail)(`String value allows only ${module$contents$goog$html$SafeStyle_VALUE_ALLOWED_CHARS}` + " and simple functions, got: " + $value$$), module$contents$goog$html$SafeStyle_SafeStyle.INNOCUOUS_STRING;
  }
  return module$contents$goog$html$SafeStyle_sanitizeUrl($value$$);
}
function module$contents$goog$html$SafeStyle_hasBalancedQuotes($value$$) {
  let $outsideSingle$$ = !0, $outsideDouble$$ = !0;
  for (let $i$$ = 0; $i$$ < $value$$.length; $i$$++) {
    const $c$$ = $value$$.charAt($i$$);
    "'" == $c$$ && $outsideDouble$$ ? $outsideSingle$$ = !$outsideSingle$$ : '"' == $c$$ && $outsideSingle$$ && ($outsideDouble$$ = !$outsideDouble$$);
  }
  return $outsideSingle$$ && $outsideDouble$$;
}
function module$contents$goog$html$SafeStyle_hasBalancedSquareBrackets($value$$) {
  let $outside$$ = !0;
  const $tokenRe$$ = /^[-_a-zA-Z0-9]$/;
  for (let $i$$ = 0; $i$$ < $value$$.length; $i$$++) {
    const $c$$ = $value$$.charAt($i$$);
    if ("]" == $c$$) {
      if ($outside$$) {
        return !1;
      }
      $outside$$ = !0;
    } else if ("[" == $c$$) {
      if (!$outside$$) {
        return !1;
      }
      $outside$$ = !1;
    } else if (!$outside$$ && !$tokenRe$$.test($c$$)) {
      return !1;
    }
  }
  return $outside$$;
}
const module$contents$goog$html$SafeStyle_VALUE_ALLOWED_CHARS = "[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]", module$contents$goog$html$SafeStyle_VALUE_RE = new RegExp(`^${module$contents$goog$html$SafeStyle_VALUE_ALLOWED_CHARS}+\$`), module$contents$goog$html$SafeStyle_URL_RE = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g"), module$contents$goog$html$SafeStyle_ALLOWED_FUNCTIONS = "calc cubic-bezier fit-content hsl hsla linear-gradient matrix minmax radial-gradient repeat rgb rgba (rotate|scale|translate)(X|Y|Z|3d)? steps var".split(" "),
module$contents$goog$html$SafeStyle_FUNCTIONS_RE = new RegExp("\\b(" + module$contents$goog$html$SafeStyle_ALLOWED_FUNCTIONS.join("|") + ")\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g"), module$contents$goog$html$SafeStyle_COMMENT_RE = /\/\*/;
function module$contents$goog$html$SafeStyle_sanitizeUrl($value$$) {
  return $value$$.replace(module$contents$goog$html$SafeStyle_URL_RE, ($match$$, $before$$, $url$$, $after$$) => {
    let $quote$$ = "";
    $url$$ = $url$$.replace(/^(['"])(.*)\1$/, ($match$$, $start$$, $inside$$) => {
      $quote$$ = $start$$;
      return $inside$$;
    });
    $match$$ = goog.html.SafeUrl.sanitize($url$$).getTypedStringValue();
    return $before$$ + $quote$$ + $match$$ + $quote$$ + $after$$;
  });
}
goog.html.SafeStyle = module$contents$goog$html$SafeStyle_SafeStyle;
goog.object = {};
function module$contents$goog$object_forEach($obj$$, $f$$, $opt_obj$$) {
  for (const $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$);
  }
}
function module$contents$goog$object_filter($obj$$, $f$$, $opt_obj$$) {
  const $res$$ = {};
  for (const $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$) && ($res$$[$key$$] = $obj$$[$key$$]);
  }
  return $res$$;
}
function module$contents$goog$object_map($obj$$, $f$$, $opt_obj$$) {
  const $res$$ = {};
  for (const $key$$ in $obj$$) {
    $res$$[$key$$] = $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$);
  }
  return $res$$;
}
function module$contents$goog$object_some($obj$$, $f$$, $opt_obj$$) {
  for (const $key$$ in $obj$$) {
    if ($f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return !0;
    }
  }
  return !1;
}
function module$contents$goog$object_every($obj$$, $f$$, $opt_obj$$) {
  for (const $key$$ in $obj$$) {
    if (!$f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return !1;
    }
  }
  return !0;
}
function module$contents$goog$object_getCount($obj$$) {
  let $rv$$ = 0;
  for (const $key$$ in $obj$$) {
    $rv$$++;
  }
  return $rv$$;
}
function module$contents$goog$object_getAnyKey($obj$$) {
  for (const $key$$ in $obj$$) {
    return $key$$;
  }
}
function module$contents$goog$object_getAnyValue($obj$$) {
  for (const $key$$ in $obj$$) {
    return $obj$$[$key$$];
  }
}
function module$contents$goog$object_contains($obj$$, $val$$) {
  return module$contents$goog$object_containsValue($obj$$, $val$$);
}
function module$contents$goog$object_getValues($obj$$) {
  const $res$$ = [];
  let $i$$ = 0;
  for (const $key$$ in $obj$$) {
    $res$$[$i$$++] = $obj$$[$key$$];
  }
  return $res$$;
}
function module$contents$goog$object_getKeys($obj$$) {
  const $res$$ = [];
  let $i$$ = 0;
  for (const $key$$ in $obj$$) {
    $res$$[$i$$++] = $key$$;
  }
  return $res$$;
}
function module$contents$goog$object_getValueByKeys($obj$$, $var_args$$) {
  var $i$$ = goog.isArrayLike($var_args$$);
  const $keys$$ = $i$$ ? $var_args$$ : arguments;
  for ($i$$ = $i$$ ? 0 : 1; $i$$ < $keys$$.length; $i$$++) {
    if (null == $obj$$) {
      return;
    }
    $obj$$ = $obj$$[$keys$$[$i$$]];
  }
  return $obj$$;
}
function module$contents$goog$object_containsKey($obj$$, $key$$) {
  return null !== $obj$$ && $key$$ in $obj$$;
}
function module$contents$goog$object_containsValue($obj$$, $val$$) {
  for (const $key$$ in $obj$$) {
    if ($obj$$[$key$$] == $val$$) {
      return !0;
    }
  }
  return !1;
}
function module$contents$goog$object_findKey($obj$$, $f$$, $thisObj$$) {
  for (const $key$$ in $obj$$) {
    if ($f$$.call($thisObj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return $key$$;
    }
  }
}
function module$contents$goog$object_findValue($obj$$, $f$jscomp$37_key$$, $thisObj$$) {
  return ($f$jscomp$37_key$$ = module$contents$goog$object_findKey($obj$$, $f$jscomp$37_key$$, $thisObj$$)) && $obj$$[$f$jscomp$37_key$$];
}
function module$contents$goog$object_isEmpty($obj$$) {
  for (const $key$$ in $obj$$) {
    return !1;
  }
  return !0;
}
function module$contents$goog$object_clear($obj$$) {
  for (const $i$$ in $obj$$) {
    delete $obj$$[$i$$];
  }
}
function module$contents$goog$object_remove($obj$$, $key$$) {
  let $rv$$;
  ($rv$$ = $key$$ in $obj$$) && delete $obj$$[$key$$];
  return $rv$$;
}
function module$contents$goog$object_add($obj$$, $key$$, $val$$) {
  if (null !== $obj$$ && $key$$ in $obj$$) {
    throw Error(`The object already contains the key "${$key$$}"`);
  }
  module$contents$goog$object_set($obj$$, $key$$, $val$$);
}
function module$contents$goog$object_get($obj$$, $key$$, $val$$) {
  return null !== $obj$$ && $key$$ in $obj$$ ? $obj$$[$key$$] : $val$$;
}
function module$contents$goog$object_set($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = $value$$;
}
function module$contents$goog$object_setIfUndefined($obj$$, $key$$, $value$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $obj$$[$key$$] = $value$$;
}
function module$contents$goog$object_setWithReturnValueIfNotSet($obj$$, $key$$, $f$jscomp$38_val$$) {
  if ($key$$ in $obj$$) {
    return $obj$$[$key$$];
  }
  $f$jscomp$38_val$$ = $f$jscomp$38_val$$();
  return $obj$$[$key$$] = $f$jscomp$38_val$$;
}
function module$contents$goog$object_equals($a$$, $b$$) {
  for (const $k$$ in $a$$) {
    if (!($k$$ in $b$$) || $a$$[$k$$] !== $b$$[$k$$]) {
      return !1;
    }
  }
  for (const $k$$ in $b$$) {
    if (!($k$$ in $a$$)) {
      return !1;
    }
  }
  return !0;
}
function module$contents$goog$object_clone($obj$$) {
  const $res$$ = {};
  for (const $key$$ in $obj$$) {
    $res$$[$key$$] = $obj$$[$key$$];
  }
  return $res$$;
}
function module$contents$goog$object_unsafeClone($obj$$) {
  if (!$obj$$ || "object" !== typeof $obj$$) {
    return $obj$$;
  }
  if ("function" === typeof $obj$$.clone) {
    return $obj$$.clone();
  }
  if ("undefined" !== typeof Map && $obj$$ instanceof Map) {
    return new Map($obj$$);
  }
  if ("undefined" !== typeof Set && $obj$$ instanceof Set) {
    return new Set($obj$$);
  }
  if ($obj$$ instanceof Date) {
    return new Date($obj$$.getTime());
  }
  const $clone$$ = Array.isArray($obj$$) ? [] : "function" !== typeof ArrayBuffer || "function" !== typeof ArrayBuffer.isView || !ArrayBuffer.isView($obj$$) || $obj$$ instanceof DataView ? {} : new $obj$$.constructor($obj$$.length);
  for (const $key$$ in $obj$$) {
    $clone$$[$key$$] = module$contents$goog$object_unsafeClone($obj$$[$key$$]);
  }
  return $clone$$;
}
function module$contents$goog$object_transpose($obj$$) {
  const $transposed$$ = {};
  for (const $key$$ in $obj$$) {
    $transposed$$[$obj$$[$key$$]] = $key$$;
  }
  return $transposed$$;
}
const module$contents$goog$object_PROTOTYPE_FIELDS = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function module$contents$goog$object_extend($target$$, $var_args$$) {
  let $key$$, $source$$;
  for (let $i$$ = 1; $i$$ < arguments.length; $i$$++) {
    $source$$ = arguments[$i$$];
    for ($key$$ in $source$$) {
      $target$$[$key$$] = $source$$[$key$$];
    }
    for (let $j$$ = 0; $j$$ < module$contents$goog$object_PROTOTYPE_FIELDS.length; $j$$++) {
      $key$$ = module$contents$goog$object_PROTOTYPE_FIELDS[$j$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$]);
    }
  }
}
function module$contents$goog$object_create($var_args$$) {
  const $argLength$$ = arguments.length;
  if (1 == $argLength$$ && Array.isArray(arguments[0])) {
    return module$contents$goog$object_create.apply(null, arguments[0]);
  }
  if ($argLength$$ % 2) {
    throw Error("Uneven number of arguments");
  }
  const $rv$$ = {};
  for (let $i$$ = 0; $i$$ < $argLength$$; $i$$ += 2) {
    $rv$$[arguments[$i$$]] = arguments[$i$$ + 1];
  }
  return $rv$$;
}
function module$contents$goog$object_createSet($var_args$$) {
  const $argLength$$ = arguments.length;
  if (1 == $argLength$$ && Array.isArray(arguments[0])) {
    return module$contents$goog$object_createSet.apply(null, arguments[0]);
  }
  const $rv$$ = {};
  for (let $i$$ = 0; $i$$ < $argLength$$; $i$$++) {
    $rv$$[arguments[$i$$]] = !0;
  }
  return $rv$$;
}
function module$contents$goog$object_createImmutableView($obj$$) {
  let $result$$ = $obj$$;
  Object.isFrozen && !Object.isFrozen($obj$$) && ($result$$ = Object.create($obj$$), Object.freeze($result$$));
  return $result$$;
}
function module$contents$goog$object_isImmutableView($obj$$) {
  return !!Object.isFrozen && Object.isFrozen($obj$$);
}
function module$contents$goog$object_getAllPropertyNames($obj$jscomp$76_proto$$, $includeObjectPrototype$$, $includeFunctionPrototype$$) {
  if (!$obj$jscomp$76_proto$$) {
    return [];
  }
  if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
    return module$contents$goog$object_getKeys($obj$jscomp$76_proto$$);
  }
  const $visitedSet$$ = {};
  for (; $obj$jscomp$76_proto$$ && ($obj$jscomp$76_proto$$ !== Object.prototype || $includeObjectPrototype$$) && ($obj$jscomp$76_proto$$ !== Function.prototype || $includeFunctionPrototype$$);) {
    const $names$$ = Object.getOwnPropertyNames($obj$jscomp$76_proto$$);
    for (let $i$$ = 0; $i$$ < $names$$.length; $i$$++) {
      $visitedSet$$[$names$$[$i$$]] = !0;
    }
    $obj$jscomp$76_proto$$ = Object.getPrototypeOf($obj$jscomp$76_proto$$);
  }
  return module$contents$goog$object_getKeys($visitedSet$$);
}
function module$contents$goog$object_getSuperClass($constructor$jscomp$2_proto$$) {
  return ($constructor$jscomp$2_proto$$ = Object.getPrototypeOf($constructor$jscomp$2_proto$$.prototype)) && $constructor$jscomp$2_proto$$.constructor;
}
goog.object.add = module$contents$goog$object_add;
goog.object.clear = module$contents$goog$object_clear;
goog.object.clone = module$contents$goog$object_clone;
goog.object.contains = module$contents$goog$object_contains;
goog.object.containsKey = module$contents$goog$object_containsKey;
goog.object.containsValue = module$contents$goog$object_containsValue;
goog.object.create = module$contents$goog$object_create;
goog.object.createImmutableView = module$contents$goog$object_createImmutableView;
goog.object.createSet = module$contents$goog$object_createSet;
goog.object.equals = module$contents$goog$object_equals;
goog.object.every = module$contents$goog$object_every;
goog.object.extend = module$contents$goog$object_extend;
goog.object.filter = module$contents$goog$object_filter;
goog.object.findKey = module$contents$goog$object_findKey;
goog.object.findValue = module$contents$goog$object_findValue;
goog.object.forEach = module$contents$goog$object_forEach;
goog.object.get = module$contents$goog$object_get;
goog.object.getAllPropertyNames = module$contents$goog$object_getAllPropertyNames;
goog.object.getAnyKey = module$contents$goog$object_getAnyKey;
goog.object.getAnyValue = module$contents$goog$object_getAnyValue;
goog.object.getCount = module$contents$goog$object_getCount;
goog.object.getKeys = module$contents$goog$object_getKeys;
goog.object.getSuperClass = module$contents$goog$object_getSuperClass;
goog.object.getValueByKeys = module$contents$goog$object_getValueByKeys;
goog.object.getValues = module$contents$goog$object_getValues;
goog.object.isEmpty = module$contents$goog$object_isEmpty;
goog.object.isImmutableView = module$contents$goog$object_isImmutableView;
goog.object.map = module$contents$goog$object_map;
goog.object.remove = module$contents$goog$object_remove;
goog.object.set = module$contents$goog$object_set;
goog.object.setIfUndefined = module$contents$goog$object_setIfUndefined;
goog.object.setWithReturnValueIfNotSet = module$contents$goog$object_setWithReturnValueIfNotSet;
goog.object.some = module$contents$goog$object_some;
goog.object.transpose = module$contents$goog$object_transpose;
goog.object.unsafeClone = module$contents$goog$object_unsafeClone;
const module$contents$goog$html$SafeStyleSheet_CONSTRUCTOR_TOKEN_PRIVATE = {};
class module$contents$goog$html$SafeStyleSheet_SafeStyleSheet {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== module$contents$goog$html$SafeStyleSheet_CONSTRUCTOR_TOKEN_PRIVATE) {
      throw Error("SafeStyleSheet is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_ = $value$$;
    this.implementsGoogStringTypedString = !0;
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_.toString();
  }
  static createRule($selector$jscomp$1_styleSheet$$, $style$$) {
    if ((0,goog.string.internal.contains)($selector$jscomp$1_styleSheet$$, "<")) {
      throw Error(`Selector does not allow '<', got: ${$selector$jscomp$1_styleSheet$$}`);
    }
    const $selectorToCheck$$ = $selector$jscomp$1_styleSheet$$.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
    if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=\\^$|]+$/.test($selectorToCheck$$)) {
      throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=\\^$|] and strings, got: " + $selector$jscomp$1_styleSheet$$);
    }
    if (!module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.hasBalancedBrackets_($selectorToCheck$$)) {
      throw Error("() and [] in selector must be balanced, got: " + $selector$jscomp$1_styleSheet$$);
    }
    $style$$ instanceof module$contents$goog$html$SafeStyle_SafeStyle || ($style$$ = module$contents$goog$html$SafeStyle_SafeStyle.create($style$$));
    $selector$jscomp$1_styleSheet$$ = `${$selector$jscomp$1_styleSheet$$}{` + module$contents$goog$html$SafeStyle_SafeStyle.unwrap($style$$).replace(/</g, "\\3C ") + "}";
    return module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse($selector$jscomp$1_styleSheet$$);
  }
  static hasBalancedBrackets_($s$$) {
    const $brackets$$ = {"(":")", "[":"]"}, $expectedBrackets$$ = [];
    for (let $i$$ = 0; $i$$ < $s$$.length; $i$$++) {
      const $ch$$ = $s$$[$i$$];
      if ($brackets$$[$ch$$]) {
        $expectedBrackets$$.push($brackets$$[$ch$$]);
      } else if (module$contents$goog$object_contains($brackets$$, $ch$$) && $expectedBrackets$$.pop() != $ch$$) {
        return !1;
      }
    }
    return 0 == $expectedBrackets$$.length;
  }
  static concat($var_args$$) {
    let $result$$ = "";
    const $addArgument$$ = $argument$$ => {
      Array.isArray($argument$$) ? $argument$$.forEach($addArgument$$) : $result$$ += module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.unwrap($argument$$);
    };
    Array.prototype.forEach.call(arguments, $addArgument$$);
    return module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse($result$$);
  }
  static fromConstant($styleSheet$$) {
    $styleSheet$$ = goog.string.Const.unwrap($styleSheet$$);
    if (0 === $styleSheet$$.length) {
      return module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.EMPTY;
    }
    (0,goog.asserts.assert)(!(0,goog.string.internal.contains)($styleSheet$$, "<"), `Forbidden '<' character in style sheet string: ${$styleSheet$$}`);
    return module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse($styleSheet$$);
  }
  getTypedStringValue() {
    return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
  }
  static unwrap($safeStyleSheet$$) {
    if ($safeStyleSheet$$ instanceof module$contents$goog$html$SafeStyleSheet_SafeStyleSheet && $safeStyleSheet$$.constructor === module$contents$goog$html$SafeStyleSheet_SafeStyleSheet) {
      return $safeStyleSheet$$.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;
    }
    (0,goog.asserts.fail)("expected object of type SafeStyleSheet, got '" + $safeStyleSheet$$ + "' of type " + goog.typeOf($safeStyleSheet$$));
    return "type_error:SafeStyleSheet";
  }
  static createSafeStyleSheetSecurityPrivateDoNotAccessOrElse($styleSheet$$) {
    return new module$contents$goog$html$SafeStyleSheet_SafeStyleSheet($styleSheet$$, module$contents$goog$html$SafeStyleSheet_CONSTRUCTOR_TOKEN_PRIVATE);
  }
}
module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.EMPTY = module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");
goog.html.SafeStyleSheet = module$contents$goog$html$SafeStyleSheet_SafeStyleSheet;
goog.flags = {};
goog.flags.USE_USER_AGENT_CLIENT_HINTS = !1;
goog.flags.ASYNC_THROW_ON_UNICODE_TO_BYTE = !1;
goog.labs = {};
goog.labs.userAgent = {};
const module$contents$goog$labs$userAgent_USE_CLIENT_HINTS_OVERRIDE = "", module$contents$goog$labs$userAgent_USE_CLIENT_HINTS = !1;
let module$contents$goog$labs$userAgent_forceClientHintsInTests = !1;
goog.labs.userAgent.setUseClientHintsForTesting = $use$$ => {
  module$contents$goog$labs$userAgent_forceClientHintsInTests = $use$$;
};
const module$contents$goog$labs$userAgent_useClientHintsRuntimeOverride = module$contents$goog$labs$userAgent_USE_CLIENT_HINTS_OVERRIDE ? !!goog.getObjectByName(module$contents$goog$labs$userAgent_USE_CLIENT_HINTS_OVERRIDE) : !1;
goog.labs.userAgent.useClientHints = () => goog.flags.USE_USER_AGENT_CLIENT_HINTS || module$contents$goog$labs$userAgent_USE_CLIENT_HINTS || module$contents$goog$labs$userAgent_useClientHintsRuntimeOverride || module$contents$goog$labs$userAgent_forceClientHintsInTests;
goog.labs.userAgent.util = {};
const module$contents$goog$labs$userAgent$util_ASSUME_CLIENT_HINTS_SUPPORT = !1;
function module$contents$goog$labs$userAgent$util_getNativeUserAgentString() {
  var $navigator$jscomp$1_userAgent$$ = module$contents$goog$labs$userAgent$util_getNavigator();
  return $navigator$jscomp$1_userAgent$$ && ($navigator$jscomp$1_userAgent$$ = $navigator$jscomp$1_userAgent$$.userAgent) ? $navigator$jscomp$1_userAgent$$ : "";
}
function module$contents$goog$labs$userAgent$util_getNativeUserAgentData() {
  const $navigator$$ = module$contents$goog$labs$userAgent$util_getNavigator();
  return $navigator$$ ? $navigator$$.userAgentData || null : null;
}
function module$contents$goog$labs$userAgent$util_getNavigator() {
  return goog.global.navigator;
}
let module$contents$goog$labs$userAgent$util_userAgentInternal = null, module$contents$goog$labs$userAgent$util_userAgentDataInternal = module$contents$goog$labs$userAgent$util_getNativeUserAgentData();
function module$contents$goog$labs$userAgent$util_setUserAgent($userAgent$$) {
  module$contents$goog$labs$userAgent$util_userAgentInternal = "string" === typeof $userAgent$$ ? $userAgent$$ : module$contents$goog$labs$userAgent$util_getNativeUserAgentString();
}
function module$contents$goog$labs$userAgent$util_getUserAgent() {
  return null == module$contents$goog$labs$userAgent$util_userAgentInternal ? module$contents$goog$labs$userAgent$util_getNativeUserAgentString() : module$contents$goog$labs$userAgent$util_userAgentInternal;
}
function module$contents$goog$labs$userAgent$util_setUserAgentData($userAgentData$$) {
  module$contents$goog$labs$userAgent$util_userAgentDataInternal = $userAgentData$$;
}
function module$contents$goog$labs$userAgent$util_resetUserAgentData() {
  module$contents$goog$labs$userAgent$util_userAgentDataInternal = module$contents$goog$labs$userAgent$util_getNativeUserAgentData();
}
function module$contents$goog$labs$userAgent$util_getUserAgentData() {
  return module$contents$goog$labs$userAgent$util_userAgentDataInternal;
}
function module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand($str$$) {
  if (!(0,goog.labs.userAgent.useClientHints)()) {
    return !1;
  }
  const $data$$ = module$contents$goog$labs$userAgent$util_getUserAgentData();
  return $data$$ ? $data$$.brands.some(({brand:$brand$$}) => $brand$$ && (0,goog.string.internal.contains)($brand$$, $str$$)) : !1;
}
function module$contents$goog$labs$userAgent$util_matchUserAgent($str$$) {
  const $userAgent$$ = module$contents$goog$labs$userAgent$util_getUserAgent();
  return (0,goog.string.internal.contains)($userAgent$$, $str$$);
}
function module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase($str$$) {
  const $userAgent$$ = module$contents$goog$labs$userAgent$util_getUserAgent();
  return (0,goog.string.internal.caseInsensitiveContains)($userAgent$$, $str$$);
}
function module$contents$goog$labs$userAgent$util_extractVersionTuples($userAgent$$) {
  const $versionRegExp$$ = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), $data$$ = [];
  let $match$$;
  for (; $match$$ = $versionRegExp$$.exec($userAgent$$);) {
    $data$$.push([$match$$[1], $match$$[2], $match$$[3] || void 0]);
  }
  return $data$$;
}
goog.labs.userAgent.util.ASSUME_CLIENT_HINTS_SUPPORT = module$contents$goog$labs$userAgent$util_ASSUME_CLIENT_HINTS_SUPPORT;
goog.labs.userAgent.util.extractVersionTuples = module$contents$goog$labs$userAgent$util_extractVersionTuples;
goog.labs.userAgent.util.getNativeUserAgentString = module$contents$goog$labs$userAgent$util_getNativeUserAgentString;
goog.labs.userAgent.util.getUserAgent = module$contents$goog$labs$userAgent$util_getUserAgent;
goog.labs.userAgent.util.getUserAgentData = module$contents$goog$labs$userAgent$util_getUserAgentData;
goog.labs.userAgent.util.matchUserAgent = module$contents$goog$labs$userAgent$util_matchUserAgent;
goog.labs.userAgent.util.matchUserAgentDataBrand = module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand;
goog.labs.userAgent.util.matchUserAgentIgnoreCase = module$contents$goog$labs$userAgent$util_matchUserAgentIgnoreCase;
goog.labs.userAgent.util.resetUserAgentData = module$contents$goog$labs$userAgent$util_resetUserAgentData;
goog.labs.userAgent.util.setUserAgent = module$contents$goog$labs$userAgent$util_setUserAgent;
goog.labs.userAgent.util.setUserAgentData = module$contents$goog$labs$userAgent$util_setUserAgentData;
var module$exports$goog$labs$userAgent$highEntropy$highEntropyValue = {AsyncValue:class {
  getIfLoaded() {
  }
  load() {
  }
}, HighEntropyValue:class {
  constructor($key$$) {
    this.key_ = $key$$;
    this.promise_ = this.value_ = void 0;
    this.pending_ = !1;
  }
  getIfLoaded() {
    if (module$contents$goog$labs$userAgent$util_getUserAgentData()) {
      return this.value_;
    }
  }
  async load() {
    const $userAgentData$$ = module$contents$goog$labs$userAgent$util_getUserAgentData();
    if ($userAgentData$$) {
      return this.promise_ || (this.pending_ = !0, this.promise_ = (async() => {
        try {
          return this.value_ = (await $userAgentData$$.getHighEntropyValues([this.key_]))[this.key_];
        } finally {
          this.pending_ = !1;
        }
      })()), await this.promise_;
    }
  }
  resetForTesting() {
    if (this.pending_) {
      throw Error("Unsafe call to resetForTesting");
    }
    this.value_ = this.promise_ = void 0;
    this.pending_ = !1;
  }
}, Version:class {
  constructor($versionString$$) {
    this.versionString_ = $versionString$$;
  }
  toVersionStringForLogging() {
    return this.versionString_;
  }
  isAtLeast($version$$) {
    return 0 <= (0,goog.string.internal.compareVersions)(this.versionString_, $version$$);
  }
}};
var module$exports$goog$labs$userAgent$highEntropy$highEntropyData = {};
module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue("fullVersionList");
module$exports$goog$labs$userAgent$highEntropy$highEntropyData.platformVersion = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.HighEntropyValue("platformVersion");
goog.labs.userAgent.browser = {};
const module$contents$goog$labs$userAgent$browser_Brand = {ANDROID_BROWSER:"Android Browser", CHROMIUM:"Chromium", EDGE:"Microsoft Edge", FIREFOX:"Firefox", IE:"Internet Explorer", OPERA:"Opera", SAFARI:"Safari", SILK:"Silk"};
goog.labs.userAgent.browser.Brand = module$contents$goog$labs$userAgent$browser_Brand;
function module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand($ignoreClientHintsFlag_userAgentData$$ = !1) {
  if (module$contents$goog$labs$userAgent$util_ASSUME_CLIENT_HINTS_SUPPORT) {
    return !0;
  }
  if (!$ignoreClientHintsFlag_userAgentData$$ && !(0,goog.labs.userAgent.useClientHints)()) {
    return !1;
  }
  $ignoreClientHintsFlag_userAgentData$$ = module$contents$goog$labs$userAgent$util_getUserAgentData();
  return !!$ignoreClientHintsFlag_userAgentData$$ && 0 < $ignoreClientHintsFlag_userAgentData$$.brands.length;
}
function module$contents$goog$labs$userAgent$browser_hasFullVersionList() {
  return module$contents$goog$labs$userAgent$browser_isAtLeast(module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM, 98);
}
function module$contents$goog$labs$userAgent$browser_matchOpera() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Opera");
}
function module$contents$goog$labs$userAgent$browser_matchIE() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Trident") || module$contents$goog$labs$userAgent$util_matchUserAgent("MSIE");
}
function module$contents$goog$labs$userAgent$browser_matchEdgeHtml() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Edge");
}
function module$contents$goog$labs$userAgent$browser_matchEdgeChromium() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.EDGE) : module$contents$goog$labs$userAgent$util_matchUserAgent("Edg/");
}
function module$contents$goog$labs$userAgent$browser_matchOperaChromium() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.OPERA) : module$contents$goog$labs$userAgent$util_matchUserAgent("OPR");
}
function module$contents$goog$labs$userAgent$browser_matchFirefox() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Firefox") || module$contents$goog$labs$userAgent$util_matchUserAgent("FxiOS");
}
function module$contents$goog$labs$userAgent$browser_matchSafari() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Safari") && !(module$contents$goog$labs$userAgent$browser_matchChrome() || module$contents$goog$labs$userAgent$browser_matchCoast() || module$contents$goog$labs$userAgent$browser_matchOpera() || module$contents$goog$labs$userAgent$browser_matchEdgeHtml() || module$contents$goog$labs$userAgent$browser_matchEdgeChromium() || module$contents$goog$labs$userAgent$browser_matchOperaChromium() || module$contents$goog$labs$userAgent$browser_matchFirefox() ||
  module$contents$goog$labs$userAgent$browser_isSilk() || module$contents$goog$labs$userAgent$util_matchUserAgent("Android"));
}
function module$contents$goog$labs$userAgent$browser_matchCoast() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? !1 : module$contents$goog$labs$userAgent$util_matchUserAgent("Coast");
}
function module$contents$goog$labs$userAgent$browser_matchIosWebview() {
  return (module$contents$goog$labs$userAgent$util_matchUserAgent("iPad") || module$contents$goog$labs$userAgent$util_matchUserAgent("iPhone")) && !module$contents$goog$labs$userAgent$browser_matchSafari() && !module$contents$goog$labs$userAgent$browser_matchChrome() && !module$contents$goog$labs$userAgent$browser_matchCoast() && !module$contents$goog$labs$userAgent$browser_matchFirefox() && module$contents$goog$labs$userAgent$util_matchUserAgent("AppleWebKit");
}
function module$contents$goog$labs$userAgent$browser_matchChrome() {
  return module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() ? module$contents$goog$labs$userAgent$util_matchUserAgentDataBrand(module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM) : (module$contents$goog$labs$userAgent$util_matchUserAgent("Chrome") || module$contents$goog$labs$userAgent$util_matchUserAgent("CriOS")) && !module$contents$goog$labs$userAgent$browser_matchEdgeHtml() || module$contents$goog$labs$userAgent$browser_isSilk();
}
function module$contents$goog$labs$userAgent$browser_matchAndroidBrowser() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Android") && !(module$contents$goog$labs$userAgent$browser_matchChrome() || module$contents$goog$labs$userAgent$browser_matchFirefox() || module$contents$goog$labs$userAgent$browser_matchOpera() || module$contents$goog$labs$userAgent$browser_isSilk());
}
const module$contents$goog$labs$userAgent$browser_isOpera = module$contents$goog$labs$userAgent$browser_matchOpera;
goog.labs.userAgent.browser.isOpera = module$contents$goog$labs$userAgent$browser_matchOpera;
const module$contents$goog$labs$userAgent$browser_isIE = module$contents$goog$labs$userAgent$browser_matchIE;
goog.labs.userAgent.browser.isIE = module$contents$goog$labs$userAgent$browser_matchIE;
const module$contents$goog$labs$userAgent$browser_isEdge = module$contents$goog$labs$userAgent$browser_matchEdgeHtml;
goog.labs.userAgent.browser.isEdge = module$contents$goog$labs$userAgent$browser_matchEdgeHtml;
const module$contents$goog$labs$userAgent$browser_isEdgeChromium = module$contents$goog$labs$userAgent$browser_matchEdgeChromium;
goog.labs.userAgent.browser.isEdgeChromium = module$contents$goog$labs$userAgent$browser_matchEdgeChromium;
const module$contents$goog$labs$userAgent$browser_isOperaChromium = module$contents$goog$labs$userAgent$browser_matchOperaChromium;
goog.labs.userAgent.browser.isOperaChromium = module$contents$goog$labs$userAgent$browser_matchOperaChromium;
const module$contents$goog$labs$userAgent$browser_isFirefox = module$contents$goog$labs$userAgent$browser_matchFirefox;
goog.labs.userAgent.browser.isFirefox = module$contents$goog$labs$userAgent$browser_matchFirefox;
const module$contents$goog$labs$userAgent$browser_isSafari = module$contents$goog$labs$userAgent$browser_matchSafari;
goog.labs.userAgent.browser.isSafari = module$contents$goog$labs$userAgent$browser_matchSafari;
const module$contents$goog$labs$userAgent$browser_isCoast = module$contents$goog$labs$userAgent$browser_matchCoast;
goog.labs.userAgent.browser.isCoast = module$contents$goog$labs$userAgent$browser_matchCoast;
const module$contents$goog$labs$userAgent$browser_isIosWebview = module$contents$goog$labs$userAgent$browser_matchIosWebview;
goog.labs.userAgent.browser.isIosWebview = module$contents$goog$labs$userAgent$browser_matchIosWebview;
const module$contents$goog$labs$userAgent$browser_isChrome = module$contents$goog$labs$userAgent$browser_matchChrome;
goog.labs.userAgent.browser.isChrome = module$contents$goog$labs$userAgent$browser_matchChrome;
const module$contents$goog$labs$userAgent$browser_isAndroidBrowser = module$contents$goog$labs$userAgent$browser_matchAndroidBrowser;
goog.labs.userAgent.browser.isAndroidBrowser = module$contents$goog$labs$userAgent$browser_matchAndroidBrowser;
function module$contents$goog$labs$userAgent$browser_isSilk() {
  return module$contents$goog$labs$userAgent$util_matchUserAgent("Silk");
}
goog.labs.userAgent.browser.isSilk = module$contents$goog$labs$userAgent$browser_isSilk;
function module$contents$goog$labs$userAgent$browser_createVersionMap($versionTuples$$) {
  const $versionMap$$ = {};
  $versionTuples$$.forEach($tuple$$ => {
    $versionMap$$[$tuple$$[0]] = $tuple$$[1];
  });
  return $keys$$ => $versionMap$$[$keys$$.find($key$$ => $key$$ in $versionMap$$)] || "";
}
function module$contents$goog$labs$userAgent$browser_getVersion() {
  var $tuple$jscomp$1_userAgentString_versionTuples$$ = module$contents$goog$labs$userAgent$util_getUserAgent();
  if (module$contents$goog$labs$userAgent$browser_matchIE()) {
    return module$contents$goog$labs$userAgent$browser_getIEVersion($tuple$jscomp$1_userAgentString_versionTuples$$);
  }
  $tuple$jscomp$1_userAgentString_versionTuples$$ = module$contents$goog$labs$userAgent$util_extractVersionTuples($tuple$jscomp$1_userAgentString_versionTuples$$);
  const $lookUpValueWithKeys$$ = module$contents$goog$labs$userAgent$browser_createVersionMap($tuple$jscomp$1_userAgentString_versionTuples$$);
  return module$contents$goog$labs$userAgent$browser_matchOpera() ? $lookUpValueWithKeys$$(["Version", "Opera"]) : module$contents$goog$labs$userAgent$browser_matchEdgeHtml() ? $lookUpValueWithKeys$$(["Edge"]) : module$contents$goog$labs$userAgent$browser_matchEdgeChromium() ? $lookUpValueWithKeys$$(["Edg"]) : module$contents$goog$labs$userAgent$browser_isSilk() ? $lookUpValueWithKeys$$(["Silk"]) : module$contents$goog$labs$userAgent$browser_matchChrome() ? $lookUpValueWithKeys$$(["Chrome", "CriOS",
  "HeadlessChrome"]) : ($tuple$jscomp$1_userAgentString_versionTuples$$ = $tuple$jscomp$1_userAgentString_versionTuples$$[2]) && $tuple$jscomp$1_userAgentString_versionTuples$$[1] || "";
}
goog.labs.userAgent.browser.getVersion = module$contents$goog$labs$userAgent$browser_getVersion;
function module$contents$goog$labs$userAgent$browser_isVersionOrHigher($version$$) {
  return 0 <= (0,goog.string.internal.compareVersions)(module$contents$goog$labs$userAgent$browser_getVersion(), $version$$);
}
goog.labs.userAgent.browser.isVersionOrHigher = module$contents$goog$labs$userAgent$browser_isVersionOrHigher;
function module$contents$goog$labs$userAgent$browser_getIEVersion($tridentVersion_userAgent$$) {
  var $rv$jscomp$6_version$$ = /rv: *([\d\.]*)/.exec($tridentVersion_userAgent$$);
  if ($rv$jscomp$6_version$$ && $rv$jscomp$6_version$$[1]) {
    return $rv$jscomp$6_version$$[1];
  }
  $rv$jscomp$6_version$$ = "";
  const $msie$$ = /MSIE +([\d\.]+)/.exec($tridentVersion_userAgent$$);
  if ($msie$$ && $msie$$[1]) {
    if ($tridentVersion_userAgent$$ = /Trident\/(\d.\d)/.exec($tridentVersion_userAgent$$), "7.0" == $msie$$[1]) {
      if ($tridentVersion_userAgent$$ && $tridentVersion_userAgent$$[1]) {
        switch($tridentVersion_userAgent$$[1]) {
          case "4.0":
            $rv$jscomp$6_version$$ = "8.0";
            break;
          case "5.0":
            $rv$jscomp$6_version$$ = "9.0";
            break;
          case "6.0":
            $rv$jscomp$6_version$$ = "10.0";
            break;
          case "7.0":
            $rv$jscomp$6_version$$ = "11.0";
        }
      } else {
        $rv$jscomp$6_version$$ = "7.0";
      }
    } else {
      $rv$jscomp$6_version$$ = $msie$$[1];
    }
  }
  return $rv$jscomp$6_version$$;
}
function module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString($browser_tuple$$) {
  var $userAgentString$jscomp$1_versionTuples$$ = module$contents$goog$labs$userAgent$util_getUserAgent();
  if ($browser_tuple$$ === module$contents$goog$labs$userAgent$browser_Brand.IE) {
    return module$contents$goog$labs$userAgent$browser_matchIE() ? module$contents$goog$labs$userAgent$browser_getIEVersion($userAgentString$jscomp$1_versionTuples$$) : "";
  }
  $userAgentString$jscomp$1_versionTuples$$ = module$contents$goog$labs$userAgent$util_extractVersionTuples($userAgentString$jscomp$1_versionTuples$$);
  const $lookUpValueWithKeys$$ = module$contents$goog$labs$userAgent$browser_createVersionMap($userAgentString$jscomp$1_versionTuples$$);
  switch($browser_tuple$$) {
    case module$contents$goog$labs$userAgent$browser_Brand.OPERA:
      if (module$contents$goog$labs$userAgent$browser_matchOpera()) {
        return $lookUpValueWithKeys$$(["Version", "Opera"]);
      }
      if (module$contents$goog$labs$userAgent$browser_matchOperaChromium()) {
        return $lookUpValueWithKeys$$(["OPR"]);
      }
      break;
    case module$contents$goog$labs$userAgent$browser_Brand.EDGE:
      if (module$contents$goog$labs$userAgent$browser_matchEdgeHtml()) {
        return $lookUpValueWithKeys$$(["Edge"]);
      }
      if (module$contents$goog$labs$userAgent$browser_matchEdgeChromium()) {
        return $lookUpValueWithKeys$$(["Edg"]);
      }
      break;
    case module$contents$goog$labs$userAgent$browser_Brand.CHROMIUM:
      if (module$contents$goog$labs$userAgent$browser_matchChrome()) {
        return $lookUpValueWithKeys$$(["Chrome", "CriOS", "HeadlessChrome"]);
      }
  }
  return $browser_tuple$$ === module$contents$goog$labs$userAgent$browser_Brand.FIREFOX && module$contents$goog$labs$userAgent$browser_matchFirefox() || $browser_tuple$$ === module$contents$goog$labs$userAgent$browser_Brand.SAFARI && module$contents$goog$labs$userAgent$browser_matchSafari() || $browser_tuple$$ === module$contents$goog$labs$userAgent$browser_Brand.ANDROID_BROWSER && module$contents$goog$labs$userAgent$browser_matchAndroidBrowser() || $browser_tuple$$ === module$contents$goog$labs$userAgent$browser_Brand.SILK &&
  module$contents$goog$labs$userAgent$browser_isSilk() ? ($browser_tuple$$ = $userAgentString$jscomp$1_versionTuples$$[2]) && $browser_tuple$$[1] || "" : "";
}
function module$contents$goog$labs$userAgent$browser_versionOf_($browser$$) {
  if (module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand() && $browser$$ !== module$contents$goog$labs$userAgent$browser_Brand.SILK) {
    var $fullVersion_matchingBrand_versionParts$$ = module$contents$goog$labs$userAgent$util_getUserAgentData().brands.find(({brand:$brand$$}) => $brand$$ === $browser$$);
    if (!$fullVersion_matchingBrand_versionParts$$ || !$fullVersion_matchingBrand_versionParts$$.version) {
      return NaN;
    }
    $fullVersion_matchingBrand_versionParts$$ = $fullVersion_matchingBrand_versionParts$$.version.split(".");
  } else {
    $fullVersion_matchingBrand_versionParts$$ = module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString($browser$$);
    if ("" === $fullVersion_matchingBrand_versionParts$$) {
      return NaN;
    }
    $fullVersion_matchingBrand_versionParts$$ = $fullVersion_matchingBrand_versionParts$$.split(".");
  }
  return 0 === $fullVersion_matchingBrand_versionParts$$.length ? NaN : Number($fullVersion_matchingBrand_versionParts$$[0]);
}
function module$contents$goog$labs$userAgent$browser_isAtLeast($brand$$, $majorVersion$$) {
  (0,goog.asserts.assert)(Math.floor($majorVersion$$) === $majorVersion$$, "Major version must be an integer");
  return module$contents$goog$labs$userAgent$browser_versionOf_($brand$$) >= $majorVersion$$;
}
goog.labs.userAgent.browser.isAtLeast = module$contents$goog$labs$userAgent$browser_isAtLeast;
function module$contents$goog$labs$userAgent$browser_isAtMost($brand$$, $majorVersion$$) {
  (0,goog.asserts.assert)(Math.floor($majorVersion$$) === $majorVersion$$, "Major version must be an integer");
  return module$contents$goog$labs$userAgent$browser_versionOf_($brand$$) <= $majorVersion$$;
}
goog.labs.userAgent.browser.isAtMost = module$contents$goog$labs$userAgent$browser_isAtMost;
class module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion {
  constructor($brand$$, $useUach$$, $fallbackVersion$$) {
    this.brand_ = $brand$$;
    this.version_ = new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version($fallbackVersion$$);
    this.useUach_ = $useUach$$;
  }
  getIfLoaded() {
    if (this.useUach_) {
      var $loadedVersionList_matchingBrand$$ = module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.getIfLoaded();
      if (void 0 !== $loadedVersionList_matchingBrand$$) {
        return $loadedVersionList_matchingBrand$$ = $loadedVersionList_matchingBrand$$.find(({brand:$brand$$}) => this.brand_ === $brand$$), (0,goog.asserts.assertExists)($loadedVersionList_matchingBrand$$), new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version($loadedVersionList_matchingBrand$$.version);
      }
    }
    if (module$contents$goog$labs$userAgent$browser_preUachHasLoaded) {
      return this.version_;
    }
  }
  async load() {
    if (this.useUach_) {
      var $loadedVersionList$jscomp$1_matchingBrand$$ = await module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.load();
      if (void 0 !== $loadedVersionList$jscomp$1_matchingBrand$$) {
        return $loadedVersionList$jscomp$1_matchingBrand$$ = $loadedVersionList$jscomp$1_matchingBrand$$.find(({brand:$brand$$}) => this.brand_ === $brand$$), (0,goog.asserts.assertExists)($loadedVersionList$jscomp$1_matchingBrand$$), new module$exports$goog$labs$userAgent$highEntropy$highEntropyValue.Version($loadedVersionList$jscomp$1_matchingBrand$$.version);
      }
    } else {
      await 0;
    }
    module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !0;
    return this.version_;
  }
}
let module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !1;
async function module$contents$goog$labs$userAgent$browser_loadFullVersions() {
  module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0) && await module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.load();
  module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !0;
}
goog.labs.userAgent.browser.loadFullVersions = module$contents$goog$labs$userAgent$browser_loadFullVersions;
goog.labs.userAgent.browser.resetForTesting = () => {
  module$contents$goog$labs$userAgent$browser_preUachHasLoaded = !1;
  module$exports$goog$labs$userAgent$highEntropy$highEntropyData.fullVersionList.resetForTesting();
};
function module$contents$goog$labs$userAgent$browser_fullVersionOf($browser$$) {
  let $fallbackVersionString$$ = "";
  module$contents$goog$labs$userAgent$browser_hasFullVersionList() || ($fallbackVersionString$$ = module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString($browser$$));
  const $useUach$$ = $browser$$ !== module$contents$goog$labs$userAgent$browser_Brand.SILK && module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0);
  if ($useUach$$) {
    if (!module$contents$goog$labs$userAgent$util_getUserAgentData().brands.find(({brand:$brand$$}) => $brand$$ === $browser$$)) {
      return;
    }
  } else if ("" === $fallbackVersionString$$) {
    return;
  }
  return new module$contents$goog$labs$userAgent$browser_HighEntropyBrandVersion($browser$$, $useUach$$, $fallbackVersionString$$);
}
goog.labs.userAgent.browser.fullVersionOf = module$contents$goog$labs$userAgent$browser_fullVersionOf;
function module$contents$goog$labs$userAgent$browser_getVersionStringForLogging($browser$$) {
  if (module$contents$goog$labs$userAgent$browser_useUserAgentDataBrand(!0)) {
    var $fullVersion$jscomp$1_fullVersionObj_matchingBrand$$ = module$contents$goog$labs$userAgent$browser_fullVersionOf($browser$$);
    if ($fullVersion$jscomp$1_fullVersionObj_matchingBrand$$) {
      if ($fullVersion$jscomp$1_fullVersionObj_matchingBrand$$ = $fullVersion$jscomp$1_fullVersionObj_matchingBrand$$.getIfLoaded()) {
        return $fullVersion$jscomp$1_fullVersionObj_matchingBrand$$.toVersionStringForLogging();
      }
      $fullVersion$jscomp$1_fullVersionObj_matchingBrand$$ = module$contents$goog$labs$userAgent$util_getUserAgentData().brands.find(({brand:$brand$$}) => $brand$$ === $browser$$);
      (0,goog.asserts.assertExists)($fullVersion$jscomp$1_fullVersionObj_matchingBrand$$);
      return $fullVersion$jscomp$1_fullVersionObj_matchingBrand$$.version;
    }
    return "";
  }
  return module$contents$goog$labs$userAgent$browser_getFullVersionFromUserAgentString($browser$$);
}
goog.labs.userAgent.browser.getVersionStringForLogging = module$contents$goog$labs$userAgent$browser_getVersionStringForLogging;
goog.dom.tags = {};
goog.dom.tags.VOID_TAGS_ = {area:!0, base:!0, br:!0, col:!0, command:!0, embed:!0, hr:!0, img:!0, input:!0, keygen:!0, link:!0, meta:!0, param:!0, source:!0, track:!0, wbr:!0};
goog.dom.tags.isVoidTag = function($tagName$$) {
  return !0 === goog.dom.tags.VOID_TAGS_[$tagName$$];
};
const module$contents$goog$html$SafeHtml_CONSTRUCTOR_TOKEN_PRIVATE = {};
class module$contents$goog$html$SafeHtml_SafeHtml {
  constructor($value$$, $token$$) {
    if (goog.DEBUG && $token$$ !== module$contents$goog$html$SafeHtml_CONSTRUCTOR_TOKEN_PRIVATE) {
      throw Error("SafeHtml is not meant to be built directly");
    }
    this.privateDoNotAccessOrElseSafeHtmlWrappedValue_ = $value$$;
    this.implementsGoogStringTypedString = !0;
  }
  getTypedStringValue() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
  }
  toString() {
    return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString();
  }
  static unwrap($safeHtml$$) {
    return module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($safeHtml$$).toString();
  }
  static unwrapTrustedHTML($safeHtml$$) {
    if ($safeHtml$$ instanceof module$contents$goog$html$SafeHtml_SafeHtml && $safeHtml$$.constructor === module$contents$goog$html$SafeHtml_SafeHtml) {
      return $safeHtml$$.privateDoNotAccessOrElseSafeHtmlWrappedValue_;
    }
    goog.asserts.fail(`expected object of type SafeHtml, got '${$safeHtml$$}' of type ` + goog.typeOf($safeHtml$$));
    return "type_error:SafeHtml";
  }
  static htmlEscape($textAsString_textOrHtml$$) {
    if ($textAsString_textOrHtml$$ instanceof module$contents$goog$html$SafeHtml_SafeHtml) {
      return $textAsString_textOrHtml$$;
    }
    $textAsString_textOrHtml$$ = "object" == typeof $textAsString_textOrHtml$$ && $textAsString_textOrHtml$$.implementsGoogStringTypedString ? $textAsString_textOrHtml$$.getTypedStringValue() : String($textAsString_textOrHtml$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape($textAsString_textOrHtml$$));
  }
  static htmlEscapePreservingNewlines($html_textOrHtml$$) {
    if ($html_textOrHtml$$ instanceof module$contents$goog$html$SafeHtml_SafeHtml) {
      return $html_textOrHtml$$;
    }
    $html_textOrHtml$$ = module$contents$goog$html$SafeHtml_SafeHtml.htmlEscape($html_textOrHtml$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(module$contents$goog$html$SafeHtml_SafeHtml.unwrap($html_textOrHtml$$)));
  }
  static htmlEscapePreservingNewlinesAndSpaces($html$jscomp$1_textOrHtml$$) {
    if ($html$jscomp$1_textOrHtml$$ instanceof module$contents$goog$html$SafeHtml_SafeHtml) {
      return $html$jscomp$1_textOrHtml$$;
    }
    $html$jscomp$1_textOrHtml$$ = module$contents$goog$html$SafeHtml_SafeHtml.htmlEscape($html$jscomp$1_textOrHtml$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(module$contents$goog$html$SafeHtml_SafeHtml.unwrap($html$jscomp$1_textOrHtml$$)));
  }
  static comment($text$$) {
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("\x3c!--" + goog.string.internal.htmlEscape($text$$) + "--\x3e");
  }
  static create($tagName$$, $attributes$$, $content$$) {
    module$contents$goog$html$SafeHtml_SafeHtml.verifyTagName(String($tagName$$));
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String($tagName$$), $attributes$$, $content$$);
  }
  static verifyTagName($tagName$$) {
    if (!module$contents$goog$html$SafeHtml_VALID_NAMES_IN_TAG.test($tagName$$)) {
      throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Invalid tag name <${$tagName$$}>.` : "");
    }
    if ($tagName$$.toUpperCase() in module$contents$goog$html$SafeHtml_NOT_ALLOWED_TAG_NAMES) {
      throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Tag name <${$tagName$$}> is not allowed for SafeHtml.` : "");
    }
  }
  static createIframe($combinedAttrs_src$$, $srcdoc$$, $attributes$$, $content$$) {
    $combinedAttrs_src$$ && goog.html.TrustedResourceUrl.unwrap($combinedAttrs_src$$);
    const $fixedAttributes$$ = {};
    $fixedAttributes$$.src = $combinedAttrs_src$$ || null;
    $fixedAttributes$$.srcdoc = $srcdoc$$ && module$contents$goog$html$SafeHtml_SafeHtml.unwrap($srcdoc$$);
    $combinedAttrs_src$$ = module$contents$goog$html$SafeHtml_SafeHtml.combineAttributes($fixedAttributes$$, {sandbox:""}, $attributes$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", $combinedAttrs_src$$, $content$$);
  }
  static createSandboxIframe($combinedAttrs$jscomp$1_src$$, $srcdoc$$, $attributes$$, $content$$) {
    if (!module$contents$goog$html$SafeHtml_SafeHtml.canUseSandboxIframe()) {
      throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? "The browser does not support sandboxed iframes." : "");
    }
    const $fixedAttributes$$ = {};
    $fixedAttributes$$.src = $combinedAttrs$jscomp$1_src$$ ? goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize($combinedAttrs$jscomp$1_src$$)) : null;
    $fixedAttributes$$.srcdoc = $srcdoc$$ || null;
    $fixedAttributes$$.sandbox = "";
    $combinedAttrs$jscomp$1_src$$ = module$contents$goog$html$SafeHtml_SafeHtml.combineAttributes($fixedAttributes$$, {}, $attributes$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe", $combinedAttrs$jscomp$1_src$$, $content$$);
  }
  static canUseSandboxIframe() {
    return goog.global.HTMLIFrameElement && "sandbox" in goog.global.HTMLIFrameElement.prototype;
  }
  static createScriptSrc($combinedAttrs$jscomp$2_src$$, $attributes$$) {
    goog.html.TrustedResourceUrl.unwrap($combinedAttrs$jscomp$2_src$$);
    $combinedAttrs$jscomp$2_src$$ = module$contents$goog$html$SafeHtml_SafeHtml.combineAttributes({src:$combinedAttrs$jscomp$2_src$$}, {}, $attributes$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", $combinedAttrs$jscomp$2_src$$);
  }
  static createScript($htmlContent_script$$, $attributes$$) {
    for (var $attr_content$$ in $attributes$$) {
      if (Object.prototype.hasOwnProperty.call($attributes$$, $attr_content$$)) {
        var $attrLower_i$$ = $attr_content$$.toLowerCase();
        if ("language" == $attrLower_i$$ || "src" == $attrLower_i$$ || "text" == $attrLower_i$$) {
          throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Cannot set "${$attrLower_i$$}" attribute` : "");
        }
      }
    }
    $attr_content$$ = "";
    $htmlContent_script$$ = module$contents$goog$array_concat($htmlContent_script$$);
    for ($attrLower_i$$ = 0; $attrLower_i$$ < $htmlContent_script$$.length; $attrLower_i$$++) {
      $attr_content$$ += module$contents$goog$html$SafeScript_SafeScript.unwrap($htmlContent_script$$[$attrLower_i$$]);
    }
    $htmlContent_script$$ = module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse($attr_content$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script", $attributes$$, $htmlContent_script$$);
  }
  static createStyle($htmlContent$jscomp$1_styleSheet$$, $attributes$jscomp$6_combinedAttrs$$) {
    $attributes$jscomp$6_combinedAttrs$$ = module$contents$goog$html$SafeHtml_SafeHtml.combineAttributes({type:"text/css"}, {}, $attributes$jscomp$6_combinedAttrs$$);
    let $content$$ = "";
    $htmlContent$jscomp$1_styleSheet$$ = module$contents$goog$array_concat($htmlContent$jscomp$1_styleSheet$$);
    for (let $i$$ = 0; $i$$ < $htmlContent$jscomp$1_styleSheet$$.length; $i$$++) {
      $content$$ += module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.unwrap($htmlContent$jscomp$1_styleSheet$$[$i$$]);
    }
    $htmlContent$jscomp$1_styleSheet$$ = module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse($content$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style", $attributes$jscomp$6_combinedAttrs$$, $htmlContent$jscomp$1_styleSheet$$);
  }
  static createMetaRefresh($unwrappedUrl_url$$, $secs$$) {
    $unwrappedUrl_url$$ = goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize($unwrappedUrl_url$$));
    (module$contents$goog$labs$userAgent$browser_matchIE() || module$contents$goog$labs$userAgent$browser_matchEdgeHtml()) && goog.string.internal.contains($unwrappedUrl_url$$, ";") && ($unwrappedUrl_url$$ = "'" + $unwrappedUrl_url$$.replace(/'/g, "%27") + "'");
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta", {"http-equiv":"refresh", content:($secs$$ || 0) + "; url=" + $unwrappedUrl_url$$});
  }
  static join($separator_separatorHtml$$, $parts$$) {
    $separator_separatorHtml$$ = module$contents$goog$html$SafeHtml_SafeHtml.htmlEscape($separator_separatorHtml$$);
    const $content$$ = [], $addArgument$$ = $argument$jscomp$2_html$$ => {
      Array.isArray($argument$jscomp$2_html$$) ? $argument$jscomp$2_html$$.forEach($addArgument$$) : ($argument$jscomp$2_html$$ = module$contents$goog$html$SafeHtml_SafeHtml.htmlEscape($argument$jscomp$2_html$$), $content$$.push(module$contents$goog$html$SafeHtml_SafeHtml.unwrap($argument$jscomp$2_html$$)));
    };
    $parts$$.forEach($addArgument$$);
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse($content$$.join(module$contents$goog$html$SafeHtml_SafeHtml.unwrap($separator_separatorHtml$$)));
  }
  static concat($var_args$$) {
    return module$contents$goog$html$SafeHtml_SafeHtml.join(module$contents$goog$html$SafeHtml_SafeHtml.EMPTY, Array.prototype.slice.call(arguments));
  }
  static createSafeHtmlSecurityPrivateDoNotAccessOrElse($html$$) {
    const $policy$$ = goog.html.trustedtypes.getPolicyPrivateDoNotAccessOrElse();
    $html$$ = $policy$$ ? $policy$$.createHTML($html$$) : $html$$;
    return new module$contents$goog$html$SafeHtml_SafeHtml($html$$, module$contents$goog$html$SafeHtml_CONSTRUCTOR_TOKEN_PRIVATE);
  }
  static createSafeHtmlTagSecurityPrivateDoNotAccessOrElse($tagName$$, $attributes$jscomp$8_result$$, $content$jscomp$6_html$$) {
    $attributes$jscomp$8_result$$ = `<${$tagName$$}` + module$contents$goog$html$SafeHtml_SafeHtml.stringifyAttributes($tagName$$, $attributes$jscomp$8_result$$);
    null == $content$jscomp$6_html$$ ? $content$jscomp$6_html$$ = [] : Array.isArray($content$jscomp$6_html$$) || ($content$jscomp$6_html$$ = [$content$jscomp$6_html$$]);
    goog.dom.tags.isVoidTag($tagName$$.toLowerCase()) ? (goog.asserts.assert(!$content$jscomp$6_html$$.length, `Void tag <${$tagName$$}> does not allow content.`), $attributes$jscomp$8_result$$ += ">") : ($content$jscomp$6_html$$ = module$contents$goog$html$SafeHtml_SafeHtml.concat($content$jscomp$6_html$$), $attributes$jscomp$8_result$$ += ">" + module$contents$goog$html$SafeHtml_SafeHtml.unwrap($content$jscomp$6_html$$) + "</" + $tagName$$ + ">");
    return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse($attributes$jscomp$8_result$$);
  }
  static stringifyAttributes($tagName$$, $attributes$$) {
    let $result$$ = "";
    if ($attributes$$) {
      for (let $name$$ in $attributes$$) {
        if (Object.prototype.hasOwnProperty.call($attributes$$, $name$$)) {
          if (!module$contents$goog$html$SafeHtml_VALID_NAMES_IN_TAG.test($name$$)) {
            throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Invalid attribute name "${$name$$}".` : "");
          }
          const $value$$ = $attributes$$[$name$$];
          null != $value$$ && ($result$$ += " " + module$contents$goog$html$SafeHtml_getAttrNameAndValue($tagName$$, $name$$, $value$$));
        }
      }
    }
    return $result$$;
  }
  static combineAttributes($fixedAttributes$$, $defaultAttributes$$, $attributes$$) {
    const $combinedAttributes$$ = {};
    for (var $name$jscomp$0$$ in $fixedAttributes$$) {
      Object.prototype.hasOwnProperty.call($fixedAttributes$$, $name$jscomp$0$$) && (goog.asserts.assert($name$jscomp$0$$.toLowerCase() == $name$jscomp$0$$, "Must be lower case"), $combinedAttributes$$[$name$jscomp$0$$] = $fixedAttributes$$[$name$jscomp$0$$]);
    }
    for (const $name$$ in $defaultAttributes$$) {
      Object.prototype.hasOwnProperty.call($defaultAttributes$$, $name$$) && (goog.asserts.assert($name$$.toLowerCase() == $name$$, "Must be lower case"), $combinedAttributes$$[$name$$] = $defaultAttributes$$[$name$$]);
    }
    if ($attributes$$) {
      for (const $name$$ in $attributes$$) {
        if (Object.prototype.hasOwnProperty.call($attributes$$, $name$$)) {
          $name$jscomp$0$$ = $name$$.toLowerCase();
          if ($name$jscomp$0$$ in $fixedAttributes$$) {
            throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Cannot override "${$name$jscomp$0$$}" attribute, got "` + $name$$ + '" with value "' + $attributes$$[$name$$] + '"' : "");
          }
          $name$jscomp$0$$ in $defaultAttributes$$ && delete $combinedAttributes$$[$name$jscomp$0$$];
          $combinedAttributes$$[$name$$] = $attributes$$[$name$$];
        }
      }
    }
    return $combinedAttributes$$;
  }
}
module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES = goog.DEBUG;
module$contents$goog$html$SafeHtml_SafeHtml.SUPPORT_STYLE_ATTRIBUTE = !0;
module$contents$goog$html$SafeHtml_SafeHtml.from = module$contents$goog$html$SafeHtml_SafeHtml.htmlEscape;
const module$contents$goog$html$SafeHtml_VALID_NAMES_IN_TAG = /^[a-zA-Z0-9-]+$/, module$contents$goog$html$SafeHtml_URL_ATTRIBUTES = {action:!0, cite:!0, data:!0, formaction:!0, href:!0, manifest:!0, poster:!0, src:!0}, module$contents$goog$html$SafeHtml_NOT_ALLOWED_TAG_NAMES = {[goog.dom.TagName.APPLET]:!0, [goog.dom.TagName.BASE]:!0, [goog.dom.TagName.EMBED]:!0, [goog.dom.TagName.IFRAME]:!0, [goog.dom.TagName.LINK]:!0, [goog.dom.TagName.MATH]:!0, [goog.dom.TagName.META]:!0, [goog.dom.TagName.OBJECT]:!0,
[goog.dom.TagName.SCRIPT]:!0, [goog.dom.TagName.STYLE]:!0, [goog.dom.TagName.SVG]:!0, [goog.dom.TagName.TEMPLATE]:!0};
function module$contents$goog$html$SafeHtml_getAttrNameAndValue($tagName$$, $name$$, $value$$) {
  if ($value$$ instanceof goog.string.Const) {
    $value$$ = goog.string.Const.unwrap($value$$);
  } else if ("style" == $name$$.toLowerCase()) {
    if (module$contents$goog$html$SafeHtml_SafeHtml.SUPPORT_STYLE_ATTRIBUTE) {
      $value$$ = module$contents$goog$html$SafeHtml_getStyleValue($value$$);
    } else {
      throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? 'Attribute "style" not supported.' : "");
    }
  } else {
    if (/^on/i.test($name$$)) {
      throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Attribute "${$name$$}` + '" requires goog.string.Const value, "' + $value$$ + '" given.' : "");
    }
    if ($name$$.toLowerCase() in module$contents$goog$html$SafeHtml_URL_ATTRIBUTES) {
      if ($value$$ instanceof goog.html.TrustedResourceUrl) {
        $value$$ = goog.html.TrustedResourceUrl.unwrap($value$$);
      } else if ($value$$ instanceof goog.html.SafeUrl) {
        $value$$ = goog.html.SafeUrl.unwrap($value$$);
      } else if ("string" === typeof $value$$) {
        $value$$ = goog.html.SafeUrl.sanitize($value$$).getTypedStringValue();
      } else {
        throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? `Attribute "${$name$$}" on tag "${$tagName$$}` + '" requires goog.html.SafeUrl, goog.string.Const, or string, value "' + $value$$ + '" given.' : "");
      }
    }
  }
  $value$$.implementsGoogStringTypedString && ($value$$ = $value$$.getTypedStringValue());
  goog.asserts.assert("string" === typeof $value$$ || "number" === typeof $value$$, "String or number value expected, got " + typeof $value$$ + " with value: " + $value$$);
  return `${$name$$}="` + goog.string.internal.htmlEscape(String($value$$)) + '"';
}
function module$contents$goog$html$SafeHtml_getStyleValue($value$$) {
  if (!goog.isObject($value$$)) {
    throw Error(module$contents$goog$html$SafeHtml_SafeHtml.ENABLE_ERROR_MESSAGES ? 'The "style" attribute requires goog.html.SafeStyle or map of style properties, ' + typeof $value$$ + " given: " + $value$$ : "");
  }
  $value$$ instanceof module$contents$goog$html$SafeStyle_SafeStyle || ($value$$ = module$contents$goog$html$SafeStyle_SafeStyle.create($value$$));
  return module$contents$goog$html$SafeStyle_SafeStyle.unwrap($value$$);
}
module$contents$goog$html$SafeHtml_SafeHtml.DOCTYPE_HTML = function() {
  return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>");
}();
module$contents$goog$html$SafeHtml_SafeHtml.EMPTY = new module$contents$goog$html$SafeHtml_SafeHtml(goog.global.trustedTypes && goog.global.trustedTypes.emptyHTML || "", module$contents$goog$html$SafeHtml_CONSTRUCTOR_TOKEN_PRIVATE);
module$contents$goog$html$SafeHtml_SafeHtml.BR = function() {
  return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>");
}();
goog.html.SafeHtml = module$contents$goog$html$SafeHtml_SafeHtml;
goog.html.uncheckedconversions = {};
goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract = function($justification$$, $html$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return module$contents$goog$html$SafeHtml_SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse($html$$);
};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract = function($justification$$, $script$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return module$contents$goog$html$SafeScript_SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse($script$$);
};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract = function($justification$$, $style$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return module$contents$goog$html$SafeStyle_SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse($style$$);
};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract = function($justification$$, $styleSheet$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return module$contents$goog$html$SafeStyleSheet_SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse($styleSheet$$);
};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract = function($justification$$, $url$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse($url$$);
};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract = function($justification$$, $url$$) {
  goog.asserts.assertString(goog.string.Const.unwrap($justification$$), "must provide justification");
  goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap($justification$$)), "must provide non-empty justification");
  return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse($url$$);
};
goog.dom.safe = {};
goog.dom.safe.InsertAdjacentHtmlPosition = {AFTERBEGIN:"afterbegin", AFTEREND:"afterend", BEFOREBEGIN:"beforebegin", BEFOREEND:"beforeend"};
goog.dom.safe.insertAdjacentHtml = function($node$$, $position$$, $html$$) {
  $node$$.insertAdjacentHTML($position$$, module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$));
};
goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_ = {MATH:!0, SCRIPT:!0, STYLE:!0, SVG:!0, TEMPLATE:!0};
goog.dom.safe.isInnerHtmlCleanupRecursive_ = goog.functions.cacheReturnValue(function() {
  if (goog.DEBUG && "undefined" === typeof document) {
    return !1;
  }
  var $div$$ = document.createElement("div"), $childDiv_innerChild$$ = document.createElement("div");
  $childDiv_innerChild$$.appendChild(document.createElement("div"));
  $div$$.appendChild($childDiv_innerChild$$);
  if (goog.DEBUG && !$div$$.firstChild) {
    return !1;
  }
  $childDiv_innerChild$$ = $div$$.firstChild.firstChild;
  $div$$.innerHTML = module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML(module$contents$goog$html$SafeHtml_SafeHtml.EMPTY);
  return !$childDiv_innerChild$$.parentElement;
});
goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse = function($elem$$, $html$$) {
  if (goog.dom.safe.isInnerHtmlCleanupRecursive_()) {
    for (; $elem$$.lastChild;) {
      $elem$$.removeChild($elem$$.lastChild);
    }
  }
  $elem$$.innerHTML = module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$);
};
goog.dom.safe.setInnerHtml = function($elem$$, $html$$) {
  if (goog.asserts.ENABLE_ASSERTS && $elem$$.tagName) {
    var $tagName$$ = $elem$$.tagName.toUpperCase();
    if (goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[$tagName$$]) {
      throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of " + $elem$$.tagName + ".");
    }
  }
  goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse($elem$$, $html$$);
};
goog.dom.safe.setInnerHtmlFromConstant = function($element$$, $constHtml$$) {
  goog.dom.safe.setInnerHtml($element$$, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Constant HTML to be immediatelly used."), goog.string.Const.unwrap($constHtml$$)));
};
goog.dom.safe.setOuterHtml = function($elem$$, $html$$) {
  $elem$$.outerHTML = module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$);
};
goog.dom.safe.setFormElementAction = function($form$$, $safeUrl$jscomp$3_url$$) {
  $safeUrl$jscomp$3_url$$ = $safeUrl$jscomp$3_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$3_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$3_url$$);
  module$contents$goog$asserts$dom_assertIsHtmlFormElement($form$$).action = goog.html.SafeUrl.unwrap($safeUrl$jscomp$3_url$$);
};
goog.dom.safe.setButtonFormAction = function($button$$, $safeUrl$jscomp$4_url$$) {
  $safeUrl$jscomp$4_url$$ = $safeUrl$jscomp$4_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$4_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$4_url$$);
  module$contents$goog$asserts$dom_assertIsHtmlButtonElement($button$$).formAction = goog.html.SafeUrl.unwrap($safeUrl$jscomp$4_url$$);
};
goog.dom.safe.setInputFormAction = function($input$$, $safeUrl$jscomp$5_url$$) {
  $safeUrl$jscomp$5_url$$ = $safeUrl$jscomp$5_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$5_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$5_url$$);
  module$contents$goog$asserts$dom_assertIsHtmlInputElement($input$$).formAction = goog.html.SafeUrl.unwrap($safeUrl$jscomp$5_url$$);
};
goog.dom.safe.setStyle = function($elem$$, $style$$) {
  $elem$$.style.cssText = module$contents$goog$html$SafeStyle_SafeStyle.unwrap($style$$);
};
goog.dom.safe.documentWrite = function($doc$$, $html$$) {
  $doc$$.write(module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$));
};
goog.dom.safe.setAnchorHref = function($anchor$$, $safeUrl$jscomp$6_url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlAnchorElement($anchor$$);
  $safeUrl$jscomp$6_url$$ = $safeUrl$jscomp$6_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$6_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$6_url$$);
  $anchor$$.href = goog.html.SafeUrl.unwrap($safeUrl$jscomp$6_url$$);
};
goog.dom.safe.setAudioSrc = function($audioElement$$, $safeUrl$jscomp$7_url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlAudioElement($audioElement$$);
  $safeUrl$jscomp$7_url$$ = $safeUrl$jscomp$7_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$7_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$7_url$$);
  $audioElement$$.src = goog.html.SafeUrl.unwrap($safeUrl$jscomp$7_url$$);
};
goog.dom.safe.setVideoSrc = function($videoElement$$, $safeUrl$jscomp$8_url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlVideoElement($videoElement$$);
  $safeUrl$jscomp$8_url$$ = $safeUrl$jscomp$8_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$8_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$8_url$$);
  $videoElement$$.src = goog.html.SafeUrl.unwrap($safeUrl$jscomp$8_url$$);
};
goog.dom.safe.setEmbedSrc = function($embed$$, $url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlEmbedElement($embed$$);
  $embed$$.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL($url$$);
};
goog.dom.safe.setFrameSrc = function($frame$$, $url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlFrameElement($frame$$);
  $frame$$.src = goog.html.TrustedResourceUrl.unwrap($url$$);
};
goog.dom.safe.setIframeSrc = function($iframe$$, $url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlIFrameElement($iframe$$);
  $iframe$$.src = goog.html.TrustedResourceUrl.unwrap($url$$);
};
goog.dom.safe.setIframeSrcdoc = function($iframe$$, $html$$) {
  module$contents$goog$asserts$dom_assertIsHtmlIFrameElement($iframe$$);
  $iframe$$.srcdoc = module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$);
};
goog.dom.safe.setLinkHrefAndRel = function($link$$, $nonce$jscomp$5_url$$, $rel$$) {
  module$contents$goog$asserts$dom_assertIsHtmlLinkElement($link$$);
  $link$$.rel = $rel$$;
  goog.string.internal.caseInsensitiveContains($rel$$, "stylesheet") ? (goog.asserts.assert($nonce$jscomp$5_url$$ instanceof goog.html.TrustedResourceUrl, 'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'), $link$$.href = goog.html.TrustedResourceUrl.unwrap($nonce$jscomp$5_url$$), ($nonce$jscomp$5_url$$ = goog.dom.safe.getStyleNonce($link$$.ownerDocument && $link$$.ownerDocument.defaultView)) && $link$$.setAttribute("nonce", $nonce$jscomp$5_url$$)) : $link$$.href = $nonce$jscomp$5_url$$ instanceof
  goog.html.TrustedResourceUrl ? goog.html.TrustedResourceUrl.unwrap($nonce$jscomp$5_url$$) : $nonce$jscomp$5_url$$ instanceof goog.html.SafeUrl ? goog.html.SafeUrl.unwrap($nonce$jscomp$5_url$$) : goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($nonce$jscomp$5_url$$));
};
goog.dom.safe.setObjectData = function($object$$, $url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlObjectElement($object$$);
  $object$$.data = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL($url$$);
};
goog.dom.safe.setScriptSrc = function($script$$, $url$$) {
  module$contents$goog$asserts$dom_assertIsHtmlScriptElement($script$$);
  goog.dom.safe.setNonceForScriptElement_($script$$);
  $script$$.src = goog.html.TrustedResourceUrl.unwrapTrustedScriptURL($url$$);
};
goog.dom.safe.setScriptContent = function($script$$, $content$$) {
  module$contents$goog$asserts$dom_assertIsHtmlScriptElement($script$$);
  goog.dom.safe.setNonceForScriptElement_($script$$);
  $script$$.textContent = module$contents$goog$html$SafeScript_SafeScript.unwrapTrustedScript($content$$);
};
goog.dom.safe.setNonceForScriptElement_ = function($script$$) {
  const $nonce$$ = goog.dom.safe.getScriptNonce($script$$.ownerDocument && $script$$.ownerDocument.defaultView);
  $nonce$$ && $script$$.setAttribute("nonce", $nonce$$);
};
goog.dom.safe.setLocationHref = function($loc$$, $safeUrl$jscomp$9_url$$) {
  goog.dom.asserts.assertIsLocation($loc$$);
  $safeUrl$jscomp$9_url$$ = $safeUrl$jscomp$9_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$9_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$9_url$$);
  $loc$$.href = goog.html.SafeUrl.unwrap($safeUrl$jscomp$9_url$$);
};
goog.dom.safe.assignLocation = function($loc$$, $safeUrl$jscomp$10_url$$) {
  goog.dom.asserts.assertIsLocation($loc$$);
  $safeUrl$jscomp$10_url$$ = $safeUrl$jscomp$10_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$10_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$10_url$$);
  $loc$$.assign(goog.html.SafeUrl.unwrap($safeUrl$jscomp$10_url$$));
};
goog.dom.safe.replaceLocation = function($loc$$, $safeUrl$jscomp$11_url$$) {
  $safeUrl$jscomp$11_url$$ = $safeUrl$jscomp$11_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$11_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$11_url$$);
  $loc$$.replace(goog.html.SafeUrl.unwrap($safeUrl$jscomp$11_url$$));
};
goog.dom.safe.openInWindow = function($safeUrl$jscomp$12_url$$, $opt_openerWin_win$$, $name$jscomp$92_opt_name$$, $opt_specs$$) {
  $safeUrl$jscomp$12_url$$ = $safeUrl$jscomp$12_url$$ instanceof goog.html.SafeUrl ? $safeUrl$jscomp$12_url$$ : goog.html.SafeUrl.sanitizeJavascriptUrlAssertUnchanged($safeUrl$jscomp$12_url$$);
  $opt_openerWin_win$$ = $opt_openerWin_win$$ || goog.global;
  $name$jscomp$92_opt_name$$ = $name$jscomp$92_opt_name$$ instanceof goog.string.Const ? goog.string.Const.unwrap($name$jscomp$92_opt_name$$) : $name$jscomp$92_opt_name$$ || "";
  return void 0 !== $opt_specs$$ ? $opt_openerWin_win$$.open(goog.html.SafeUrl.unwrap($safeUrl$jscomp$12_url$$), $name$jscomp$92_opt_name$$, $opt_specs$$) : $opt_openerWin_win$$.open(goog.html.SafeUrl.unwrap($safeUrl$jscomp$12_url$$), $name$jscomp$92_opt_name$$);
};
goog.dom.safe.parseFromStringHtml = function($parser$$, $html$$) {
  return goog.dom.safe.parseFromString($parser$$, $html$$, "text/html");
};
goog.dom.safe.parseFromString = function($parser$$, $content$$, $type$$) {
  return $parser$$.parseFromString(module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($content$$), $type$$);
};
goog.dom.safe.createImageFromBlob = function($blob$jscomp$14_image$$) {
  if (!/^image\/.*/g.test($blob$jscomp$14_image$$.type)) {
    throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");
  }
  var $objectUrl$$ = goog.global.URL.createObjectURL($blob$jscomp$14_image$$);
  $blob$jscomp$14_image$$ = new goog.global.Image();
  $blob$jscomp$14_image$$.onload = function() {
    goog.global.URL.revokeObjectURL($objectUrl$$);
  };
  $blob$jscomp$14_image$$.src = $objectUrl$$;
  return $blob$jscomp$14_image$$;
};
goog.dom.safe.createContextualFragment = function($range$$, $html$$) {
  return $range$$.createContextualFragment(module$contents$goog$html$SafeHtml_SafeHtml.unwrapTrustedHTML($html$$));
};
goog.dom.safe.getScriptNonce = function($opt_window$$) {
  return goog.dom.safe.getNonce_("script[nonce]", $opt_window$$);
};
goog.dom.safe.getStyleNonce = function($opt_window$$) {
  return goog.dom.safe.getNonce_('style[nonce],link[rel="stylesheet"][nonce]', $opt_window$$);
};
goog.dom.safe.NONCE_PATTERN_ = /^[\w+/_-]+[=]{0,2}$/;
goog.dom.safe.getNonce_ = function($el_nonce$jscomp$7_selector$$, $doc$jscomp$10_win$$) {
  $doc$jscomp$10_win$$ = ($doc$jscomp$10_win$$ || goog.global).document;
  return $doc$jscomp$10_win$$.querySelector ? ($el_nonce$jscomp$7_selector$$ = $doc$jscomp$10_win$$.querySelector($el_nonce$jscomp$7_selector$$)) && ($el_nonce$jscomp$7_selector$$ = $el_nonce$jscomp$7_selector$$.nonce || $el_nonce$jscomp$7_selector$$.getAttribute("nonce")) && goog.dom.safe.NONCE_PATTERN_.test($el_nonce$jscomp$7_selector$$) ? $el_nonce$jscomp$7_selector$$ : "" : "";
};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {NBSP:"\u00a0", ZERO_WIDTH_SPACE:"\u200b"};
goog.string.startsWith = goog.string.internal.startsWith;
goog.string.endsWith = goog.string.internal.endsWith;
goog.string.caseInsensitiveStartsWith = goog.string.internal.caseInsensitiveStartsWith;
goog.string.caseInsensitiveEndsWith = goog.string.internal.caseInsensitiveEndsWith;
goog.string.caseInsensitiveEquals = goog.string.internal.caseInsensitiveEquals;
goog.string.subs = function($str$$, $var_args$$) {
  const $splitParts$$ = $str$$.split("%s");
  let $returnString$$ = "";
  const $subsArguments$$ = Array.prototype.slice.call(arguments, 1);
  for (; $subsArguments$$.length && 1 < $splitParts$$.length;) {
    $returnString$$ += $splitParts$$.shift() + $subsArguments$$.shift();
  }
  return $returnString$$ + $splitParts$$.join("%s");
};
goog.string.collapseWhitespace = function($str$$) {
  return $str$$.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = goog.string.internal.isEmptyOrWhitespace;
goog.string.isEmptyString = function($str$$) {
  return 0 == $str$$.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function($str$$) {
  return goog.string.isEmptyOrWhitespace(goog.string.makeSafe($str$$));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function($str$$) {
  return !/[^\t\n\r ]/.test($str$$);
};
goog.string.isAlpha = function($str$$) {
  return !/[^a-zA-Z]/.test($str$$);
};
goog.string.isNumeric = function($str$$) {
  return !/[^0-9]/.test($str$$);
};
goog.string.isAlphaNumeric = function($str$$) {
  return !/[^a-zA-Z0-9]/.test($str$$);
};
goog.string.isSpace = function($ch$$) {
  return " " == $ch$$;
};
goog.string.isUnicodeChar = function($ch$$) {
  return 1 == $ch$$.length && " " <= $ch$$ && "~" >= $ch$$ || "\u0080" <= $ch$$ && "\ufffd" >= $ch$$;
};
goog.string.stripNewlines = function($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function($str$$) {
  return $str$$.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function($str$$) {
  return $str$$.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function($str$$) {
  return $str$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.string.internal.trim;
goog.string.trimLeft = function($str$$) {
  return $str$$.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function($str$$) {
  return $str$$.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = goog.string.internal.caseInsensitiveCompare;
goog.string.numberAwareCompare_ = function($num1_str1$$, $num2_str2$$, $a$$) {
  if ($num1_str1$$ == $num2_str2$$) {
    return 0;
  }
  if (!$num1_str1$$) {
    return -1;
  }
  if (!$num2_str2$$) {
    return 1;
  }
  const $tokens1$$ = $num1_str1$$.toLowerCase().match($a$$), $tokens2$$ = $num2_str2$$.toLowerCase().match($a$$), $count$$ = Math.min($tokens1$$.length, $tokens2$$.length);
  for (let $i$$ = 0; $i$$ < $count$$; $i$$++) {
    $a$$ = $tokens1$$[$i$$];
    const $b$$ = $tokens2$$[$i$$];
    if ($a$$ != $b$$) {
      return $num1_str1$$ = parseInt($a$$, 10), !isNaN($num1_str1$$) && ($num2_str2$$ = parseInt($b$$, 10), !isNaN($num2_str2$$) && $num1_str1$$ - $num2_str2$$) ? $num1_str1$$ - $num2_str2$$ : $a$$ < $b$$ ? -1 : 1;
    }
  }
  return $tokens1$$.length != $tokens2$$.length ? $tokens1$$.length - $tokens2$$.length : $num1_str1$$ < $num2_str2$$ ? -1 : 1;
};
goog.string.intAwareCompare = function($str1$$, $str2$$) {
  return goog.string.numberAwareCompare_($str1$$, $str2$$, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function($str1$$, $str2$$) {
  return goog.string.numberAwareCompare_($str1$$, $str2$$, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function($str$$) {
  return encodeURIComponent(String($str$$));
};
goog.string.urlDecode = function($str$$) {
  return decodeURIComponent($str$$.replace(/\+/g, " "));
};
goog.string.newLineToBr = goog.string.internal.newLineToBr;
goog.string.htmlEscape = function($str$$, $opt_isLikelyToContainHtmlChars$$) {
  $str$$ = goog.string.internal.htmlEscape($str$$, $opt_isLikelyToContainHtmlChars$$);
  goog.string.DETECT_DOUBLE_ESCAPING && ($str$$ = $str$$.replace(goog.string.E_RE_, "&#101;"));
  return $str$$;
};
goog.string.E_RE_ = /e/g;
goog.string.unescapeEntities = function($str$$) {
  return goog.string.contains($str$$, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_($str$$) : goog.string.unescapePureXmlEntities_($str$$) : $str$$;
};
goog.string.unescapeEntitiesWithDocument = function($str$$, $document$$) {
  return goog.string.contains($str$$, "&") ? goog.string.unescapeEntitiesUsingDom_($str$$, $document$$) : $str$$;
};
goog.string.unescapeEntitiesUsingDom_ = function($str$$, $opt_document$$) {
  const $seen$$ = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'};
  let $div$$;
  $div$$ = $opt_document$$ ? $opt_document$$.createElement("div") : goog.global.document.createElement("div");
  return $str$$.replace(goog.string.HTML_ENTITY_PATTERN_, function($s$$, $entity_n$$) {
    let $value$$ = $seen$$[$s$$];
    if ($value$$) {
      return $value$$;
    }
    "#" == $entity_n$$.charAt(0) && ($entity_n$$ = Number("0" + $entity_n$$.slice(1)), isNaN($entity_n$$) || ($value$$ = String.fromCharCode($entity_n$$)));
    $value$$ || (goog.dom.safe.setInnerHtml($div$$, goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."), $s$$ + " ")), $value$$ = $div$$.firstChild.nodeValue.slice(0, -1));
    return $seen$$[$s$$] = $value$$;
  });
};
goog.string.unescapePureXmlEntities_ = function($str$$) {
  return $str$$.replace(/&([^;]+);/g, function($s$$, $entity$jscomp$1_n$$) {
    switch($entity$jscomp$1_n$$) {
      case "amp":
        return "&";
      case "lt":
        return "<";
      case "gt":
        return ">";
      case "quot":
        return '"';
      default:
        return "#" != $entity$jscomp$1_n$$.charAt(0) || ($entity$jscomp$1_n$$ = Number("0" + $entity$jscomp$1_n$$.slice(1)), isNaN($entity$jscomp$1_n$$)) ? $s$$ : String.fromCharCode($entity$jscomp$1_n$$);
    }
  });
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function($str$$, $opt_xml$$) {
  return goog.string.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$);
};
goog.string.preserveSpaces = function($str$$) {
  return $str$$.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function($str$$, $quoteChars$$) {
  const $length$$ = $quoteChars$$.length;
  for (let $i$$ = 0; $i$$ < $length$$; $i$$++) {
    const $quoteChar$$ = 1 == $length$$ ? $quoteChars$$ : $quoteChars$$.charAt($i$$);
    if ($str$$.charAt(0) == $quoteChar$$ && $str$$.charAt($str$$.length - 1) == $quoteChar$$) {
      return $str$$.substring(1, $str$$.length - 1);
    }
  }
  return $str$$;
};
goog.string.truncate = function($str$$, $chars$$, $opt_protectEscapedCharacters$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  $str$$.length > $chars$$ && ($str$$ = $str$$.substring(0, $chars$$ - 3) + "...");
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$;
};
goog.string.truncateMiddle = function($str$$, $chars$$, $opt_protectEscapedCharacters$$, $half_opt_trailingChars$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  if ($half_opt_trailingChars$$ && $str$$.length > $chars$$) {
    $half_opt_trailingChars$$ > $chars$$ && ($half_opt_trailingChars$$ = $chars$$);
    var $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$;
    $str$$ = $str$$.substring(0, $chars$$ - $half_opt_trailingChars$$) + "..." + $str$$.substring($endPoint_endPos$$);
  } else {
    $str$$.length > $chars$$ && ($half_opt_trailingChars$$ = Math.floor($chars$$ / 2), $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $half_opt_trailingChars$$ + $chars$$ % 2) + "..." + $str$$.substring($endPoint_endPos$$));
  }
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$;
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\v":"\\x0B", '"':'\\"', "\\":"\\\\", "<":"\\u003C"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function($s$$) {
  $s$$ = String($s$$);
  const $sb$$ = ['"'];
  for (let $i$$ = 0; $i$$ < $s$$.length; $i$$++) {
    const $ch$$ = $s$$.charAt($i$$), $cc$$ = $ch$$.charCodeAt(0);
    $sb$$[$i$$ + 1] = goog.string.specialEscapeChars_[$ch$$] || (31 < $cc$$ && 127 > $cc$$ ? $ch$$ : goog.string.escapeChar($ch$$));
  }
  $sb$$.push('"');
  return $sb$$.join("");
};
goog.string.escapeString = function($str$$) {
  const $sb$$ = [];
  for (let $i$$ = 0; $i$$ < $str$$.length; $i$$++) {
    $sb$$[$i$$] = goog.string.escapeChar($str$$.charAt($i$$));
  }
  return $sb$$.join("");
};
goog.string.escapeChar = function($c$$) {
  if ($c$$ in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[$c$$];
  }
  if ($c$$ in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[$c$$] = goog.string.specialEscapeChars_[$c$$];
  }
  let $rv$$;
  const $cc$$ = $c$$.charCodeAt(0);
  if (31 < $cc$$ && 127 > $cc$$) {
    $rv$$ = $c$$;
  } else {
    if (256 > $cc$$) {
      if ($rv$$ = "\\x", 16 > $cc$$ || 256 < $cc$$) {
        $rv$$ += "0";
      }
    } else {
      $rv$$ = "\\u", 4096 > $cc$$ && ($rv$$ += "0");
    }
    $rv$$ += $cc$$.toString(16).toUpperCase();
  }
  return goog.string.jsEscapeCache_[$c$$] = $rv$$;
};
goog.string.contains = goog.string.internal.contains;
goog.string.caseInsensitiveContains = goog.string.internal.caseInsensitiveContains;
goog.string.countOf = function($s$$, $ss$$) {
  return $s$$ && $ss$$ ? $s$$.split($ss$$).length - 1 : 0;
};
goog.string.removeAt = function($s$$, $index$$, $stringLength$$) {
  let $resultStr$$ = $s$$;
  0 <= $index$$ && $index$$ < $s$$.length && 0 < $stringLength$$ && ($resultStr$$ = $s$$.slice(0, $index$$) + $s$$.slice($index$$ + $stringLength$$));
  return $resultStr$$;
};
goog.string.remove = function($str$$, $substr$$) {
  return $str$$.replace($substr$$, "");
};
goog.string.removeAll = function($s$$, $re_ss$$) {
  $re_ss$$ = new RegExp(goog.string.regExpEscape($re_ss$$), "g");
  return $s$$.replace($re_ss$$, "");
};
goog.string.replaceAll = function($s$$, $re$jscomp$1_ss$$, $replacement$$) {
  $re$jscomp$1_ss$$ = new RegExp(goog.string.regExpEscape($re$jscomp$1_ss$$), "g");
  return $s$$.replace($re$jscomp$1_ss$$, $replacement$$.replace(/\$/g, "$$$$"));
};
goog.string.regExpEscape = function($s$$) {
  return String($s$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function($string$$, $length$$) {
  return $string$$.repeat($length$$);
} : function($string$$, $length$$) {
  return Array($length$$ + 1).join($string$$);
};
goog.string.padNumber = function($num$jscomp$6_s$$, $length$$, $index$jscomp$111_opt_precision$$) {
  if (!Number.isFinite($num$jscomp$6_s$$)) {
    return String($num$jscomp$6_s$$);
  }
  $num$jscomp$6_s$$ = void 0 !== $index$jscomp$111_opt_precision$$ ? $num$jscomp$6_s$$.toFixed($index$jscomp$111_opt_precision$$) : String($num$jscomp$6_s$$);
  $index$jscomp$111_opt_precision$$ = $num$jscomp$6_s$$.indexOf(".");
  -1 === $index$jscomp$111_opt_precision$$ && ($index$jscomp$111_opt_precision$$ = $num$jscomp$6_s$$.length);
  const $sign$$ = "-" === $num$jscomp$6_s$$[0] ? "-" : "";
  $sign$$ && ($num$jscomp$6_s$$ = $num$jscomp$6_s$$.substring(1));
  return $sign$$ + goog.string.repeat("0", Math.max(0, $length$$ - $index$jscomp$111_opt_precision$$)) + $num$jscomp$6_s$$;
};
goog.string.makeSafe = function($obj$$) {
  return null == $obj$$ ? "" : String($obj$$);
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = goog.string.internal.compareVersions;
goog.string.hashCode = function($str$$) {
  let $result$$ = 0;
  for (let $i$$ = 0; $i$$ < $str$$.length; ++$i$$) {
    $result$$ = 31 * $result$$ + $str$$.charCodeAt($i$$) >>> 0;
  }
  return $result$$;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function($str$$) {
  const $num$$ = Number($str$$);
  return 0 == $num$$ && goog.string.isEmptyOrWhitespace($str$$) ? NaN : $num$$;
};
goog.string.isLowerCamelCase = function($str$$) {
  return /^[a-z]+([A-Z][a-z]*)*$/.test($str$$);
};
goog.string.isUpperCamelCase = function($str$$) {
  return /^([A-Z][a-z]*)+$/.test($str$$);
};
goog.string.toCamelCase = function($str$$) {
  return String($str$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase();
  });
};
goog.string.toSelectorCase = function($str$$) {
  return String($str$$).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function($str$$, $delimiters_opt_delimiters$$) {
  $delimiters_opt_delimiters$$ = "string" === typeof $delimiters_opt_delimiters$$ ? goog.string.regExpEscape($delimiters_opt_delimiters$$) : "\\s";
  return $str$$.replace(new RegExp("(^" + ($delimiters_opt_delimiters$$ ? "|[" + $delimiters_opt_delimiters$$ + "]+" : "") + ")([a-z])", "g"), function($all$$, $p1$$, $p2$$) {
    return $p1$$ + $p2$$.toUpperCase();
  });
};
goog.string.capitalize = function($str$$) {
  return String($str$$.charAt(0)).toUpperCase() + String($str$$.slice(1)).toLowerCase();
};
goog.string.parseInt = function($value$$) {
  isFinite($value$$) && ($value$$ = String($value$$));
  return "string" === typeof $value$$ ? /^\s*-?0x/i.test($value$$) ? parseInt($value$$, 16) : parseInt($value$$, 10) : NaN;
};
goog.string.splitLimit = function($parts$jscomp$7_str$$, $separator$$, $limit$$) {
  $parts$jscomp$7_str$$ = $parts$jscomp$7_str$$.split($separator$$);
  const $returnVal$$ = [];
  for (; 0 < $limit$$ && $parts$jscomp$7_str$$.length;) {
    $returnVal$$.push($parts$jscomp$7_str$$.shift()), $limit$$--;
  }
  $parts$jscomp$7_str$$.length && $returnVal$$.push($parts$jscomp$7_str$$.join($separator$$));
  return $returnVal$$;
};
goog.string.lastComponent = function($str$$, $separators$$) {
  if ($separators$$) {
    "string" == typeof $separators$$ && ($separators$$ = [$separators$$]);
  } else {
    return $str$$;
  }
  let $lastSeparatorIndex$$ = -1;
  for (let $i$$ = 0; $i$$ < $separators$$.length; $i$$++) {
    if ("" == $separators$$[$i$$]) {
      continue;
    }
    const $currentSeparatorIndex$$ = $str$$.lastIndexOf($separators$$[$i$$]);
    $currentSeparatorIndex$$ > $lastSeparatorIndex$$ && ($lastSeparatorIndex$$ = $currentSeparatorIndex$$);
  }
  return -1 == $lastSeparatorIndex$$ ? $str$$ : $str$$.slice($lastSeparatorIndex$$ + 1);
};
goog.string.editDistance = function($a$$, $b$$) {
  const $v0$$ = [], $v1$$ = [];
  if ($a$$ == $b$$) {
    return 0;
  }
  if (!$a$$.length || !$b$$.length) {
    return Math.max($a$$.length, $b$$.length);
  }
  for (var $i$jscomp$80_i$$ = 0; $i$jscomp$80_i$$ < $b$$.length + 1; $i$jscomp$80_i$$++) {
    $v0$$[$i$jscomp$80_i$$] = $i$jscomp$80_i$$;
  }
  for ($i$jscomp$80_i$$ = 0; $i$jscomp$80_i$$ < $a$$.length; $i$jscomp$80_i$$++) {
    $v1$$[0] = $i$jscomp$80_i$$ + 1;
    for (var $j$jscomp$4_j$$ = 0; $j$jscomp$4_j$$ < $b$$.length; $j$jscomp$4_j$$++) {
      $v1$$[$j$jscomp$4_j$$ + 1] = Math.min($v1$$[$j$jscomp$4_j$$] + 1, $v0$$[$j$jscomp$4_j$$ + 1] + 1, $v0$$[$j$jscomp$4_j$$] + Number($a$$[$i$jscomp$80_i$$] != $b$$[$j$jscomp$4_j$$]));
    }
    for ($j$jscomp$4_j$$ = 0; $j$jscomp$4_j$$ < $v0$$.length; $j$jscomp$4_j$$++) {
      $v0$$[$j$jscomp$4_j$$] = $v1$$[$j$jscomp$4_j$$];
    }
  }
  return $v1$$[$b$$.length];
};
goog.structs = {};
goog.structs.getCount = function($col$$) {
  return $col$$.getCount && "function" == typeof $col$$.getCount ? $col$$.getCount() : goog.isArrayLike($col$$) || "string" === typeof $col$$ ? $col$$.length : module$contents$goog$object_getCount($col$$);
};
goog.structs.getValues = function($col$$) {
  if ($col$$.getValues && "function" == typeof $col$$.getValues) {
    return $col$$.getValues();
  }
  if ("undefined" !== typeof Map && $col$$ instanceof Map || "undefined" !== typeof Set && $col$$ instanceof Set) {
    return Array.from($col$$.values());
  }
  if ("string" === typeof $col$$) {
    return $col$$.split("");
  }
  if (goog.isArrayLike($col$$)) {
    for (var $rv$$ = [], $l$$ = $col$$.length, $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $rv$$.push($col$$[$i$$]);
    }
    return $rv$$;
  }
  return module$contents$goog$object_getValues($col$$);
};
goog.structs.getKeys = function($col$jscomp$2_l$$) {
  if ($col$jscomp$2_l$$.getKeys && "function" == typeof $col$jscomp$2_l$$.getKeys) {
    return $col$jscomp$2_l$$.getKeys();
  }
  if (!$col$jscomp$2_l$$.getValues || "function" != typeof $col$jscomp$2_l$$.getValues) {
    if ("undefined" !== typeof Map && $col$jscomp$2_l$$ instanceof Map) {
      return Array.from($col$jscomp$2_l$$.keys());
    }
    if (!("undefined" !== typeof Set && $col$jscomp$2_l$$ instanceof Set)) {
      if (goog.isArrayLike($col$jscomp$2_l$$) || "string" === typeof $col$jscomp$2_l$$) {
        var $rv$$ = [];
        $col$jscomp$2_l$$ = $col$jscomp$2_l$$.length;
        for (var $i$$ = 0; $i$$ < $col$jscomp$2_l$$; $i$$++) {
          $rv$$.push($i$$);
        }
        return $rv$$;
      }
      return module$contents$goog$object_getKeys($col$jscomp$2_l$$);
    }
  }
};
goog.structs.contains = function($col$$, $val$$) {
  return $col$$.contains && "function" == typeof $col$$.contains ? $col$$.contains($val$$) : $col$$.containsValue && "function" == typeof $col$$.containsValue ? $col$$.containsValue($val$$) : goog.isArrayLike($col$$) || "string" === typeof $col$$ ? module$contents$goog$array_contains($col$$, $val$$) : module$contents$goog$object_containsValue($col$$, $val$$);
};
goog.structs.isEmpty = function($col$$) {
  return $col$$.isEmpty && "function" == typeof $col$$.isEmpty ? $col$$.isEmpty() : goog.isArrayLike($col$$) || "string" === typeof $col$$ ? 0 === $col$$.length : module$contents$goog$object_isEmpty($col$$);
};
goog.structs.clear = function($col$$) {
  $col$$.clear && "function" == typeof $col$$.clear ? $col$$.clear() : goog.isArrayLike($col$$) ? module$contents$goog$array_clear($col$$) : module$contents$goog$object_clear($col$$);
};
goog.structs.forEach = function($col$$, $f$$, $opt_obj$$) {
  if ($col$$.forEach && "function" == typeof $col$$.forEach) {
    $col$$.forEach($f$$, $opt_obj$$);
  } else if (goog.isArrayLike($col$$) || "string" === typeof $col$$) {
    Array.prototype.forEach.call($col$$, $f$$, $opt_obj$$);
  } else {
    for (var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$);
    }
  }
};
goog.structs.filter = function($col$$, $f$$, $opt_obj$$) {
  if ("function" == typeof $col$$.filter) {
    return $col$$.filter($f$$, $opt_obj$$);
  }
  if (goog.isArrayLike($col$$) || "string" === typeof $col$$) {
    return Array.prototype.filter.call($col$$, $f$$, $opt_obj$$);
  }
  var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if ($keys$$) {
    var $rv$$ = {};
    for (var $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$) && ($rv$$[$keys$$[$i$$]] = $values$$[$i$$]);
    }
  } else {
    for ($rv$$ = [], $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$) && $rv$$.push($values$$[$i$$]);
    }
  }
  return $rv$$;
};
goog.structs.map = function($col$$, $f$$, $opt_obj$$) {
  if ("function" == typeof $col$$.map) {
    return $col$$.map($f$$, $opt_obj$$);
  }
  if (goog.isArrayLike($col$$) || "string" === typeof $col$$) {
    return Array.prototype.map.call($col$$, $f$$, $opt_obj$$);
  }
  var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if ($keys$$) {
    var $rv$$ = {};
    for (var $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $rv$$[$keys$$[$i$$]] = $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$);
    }
  } else {
    for ($rv$$ = [], $i$$ = 0; $i$$ < $l$$; $i$$++) {
      $rv$$[$i$$] = $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$);
    }
  }
  return $rv$$;
};
goog.structs.some = function($col$$, $f$$, $opt_obj$$) {
  if ("function" == typeof $col$$.some) {
    return $col$$.some($f$$, $opt_obj$$);
  }
  if (goog.isArrayLike($col$$) || "string" === typeof $col$$) {
    return Array.prototype.some.call($col$$, $f$$, $opt_obj$$);
  }
  for (var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if ($f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return !0;
    }
  }
  return !1;
};
goog.structs.every = function($col$$, $f$$, $opt_obj$$) {
  if ("function" == typeof $col$$.every) {
    return $col$$.every($f$$, $opt_obj$$);
  }
  if (goog.isArrayLike($col$$) || "string" === typeof $col$$) {
    return Array.prototype.every.call($col$$, $f$$, $opt_obj$$);
  }
  for (var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0; $i$$ < $l$$; $i$$++) {
    if (!$f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return !1;
    }
  }
  return !0;
};
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.QueryArray = {};
goog.uri.utils.QueryValue = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_queryData$$, $opt_fragment$$) {
  var $out$$ = "";
  $opt_scheme$$ && ($out$$ += $opt_scheme$$ + ":");
  $opt_domain$$ && ($out$$ += "//", $opt_userInfo$$ && ($out$$ += $opt_userInfo$$ + "@"), $out$$ += $opt_domain$$, $opt_port$$ && ($out$$ += ":" + $opt_port$$));
  $opt_path$$ && ($out$$ += $opt_path$$);
  $opt_queryData$$ && ($out$$ += "?" + $opt_queryData$$);
  $opt_fragment$$ && ($out$$ += "#" + $opt_fragment$$);
  return $out$$;
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.urlPackageSupportLoggingHandler_ = null;
goog.uri.utils.setUrlPackageSupportLoggingHandler = function($handler$$) {
  goog.uri.utils.urlPackageSupportLoggingHandler_ = $handler$$;
};
goog.uri.utils.split = function($uri$$) {
  var $result$$ = $uri$$.match(goog.uri.utils.splitRe_);
  goog.uri.utils.urlPackageSupportLoggingHandler_ && 0 <= ["http", "https", "ws", "wss", "ftp"].indexOf($result$$[goog.uri.utils.ComponentIndex.SCHEME]) && goog.uri.utils.urlPackageSupportLoggingHandler_($uri$$);
  return $result$$;
};
goog.uri.utils.decodeIfPossible_ = function($uri$$, $opt_preserveReserved$$) {
  return $uri$$ ? $opt_preserveReserved$$ ? decodeURI($uri$$) : decodeURIComponent($uri$$) : $uri$$;
};
goog.uri.utils.getComponentByIndex_ = function($componentIndex$$, $uri$$) {
  return goog.uri.utils.split($uri$$)[$componentIndex$$] || null;
};
goog.uri.utils.getScheme = function($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, $uri$$);
};
goog.uri.utils.getEffectiveScheme = function($scheme$jscomp$3_uri$$) {
  $scheme$jscomp$3_uri$$ = goog.uri.utils.getScheme($scheme$jscomp$3_uri$$);
  !$scheme$jscomp$3_uri$$ && goog.global.self && goog.global.self.location && ($scheme$jscomp$3_uri$$ = goog.global.self.location.protocol.slice(0, -1));
  return $scheme$jscomp$3_uri$$ ? $scheme$jscomp$3_uri$$.toLowerCase() : "";
};
goog.uri.utils.getUserInfoEncoded = function($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, $uri$$);
};
goog.uri.utils.getUserInfo = function($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded($uri$$));
};
goog.uri.utils.getDomainEncoded = function($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, $uri$$);
};
goog.uri.utils.getDomain = function($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded($uri$$), !0);
};
goog.uri.utils.getPort = function($uri$$) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, $uri$$)) || null;
};
goog.uri.utils.getPathEncoded = function($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, $uri$$);
};
goog.uri.utils.getPath = function($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded($uri$$), !0);
};
goog.uri.utils.getQueryData = function($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, $uri$$);
};
goog.uri.utils.getFragmentEncoded = function($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? null : $uri$$.slice($hashIndex$$ + 1);
};
goog.uri.utils.setFragmentEncoded = function($uri$$, $fragment$$) {
  return goog.uri.utils.removeFragment($uri$$) + ($fragment$$ ? "#" + $fragment$$ : "");
};
goog.uri.utils.getFragment = function($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded($uri$$));
};
goog.uri.utils.getHost = function($pieces_uri$$) {
  $pieces_uri$$ = goog.uri.utils.split($pieces_uri$$);
  return goog.uri.utils.buildFromEncodedParts($pieces_uri$$[goog.uri.utils.ComponentIndex.SCHEME], $pieces_uri$$[goog.uri.utils.ComponentIndex.USER_INFO], $pieces_uri$$[goog.uri.utils.ComponentIndex.DOMAIN], $pieces_uri$$[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getOrigin = function($pieces$jscomp$1_uri$$) {
  $pieces$jscomp$1_uri$$ = goog.uri.utils.split($pieces$jscomp$1_uri$$);
  return goog.uri.utils.buildFromEncodedParts($pieces$jscomp$1_uri$$[goog.uri.utils.ComponentIndex.SCHEME], null, $pieces$jscomp$1_uri$$[goog.uri.utils.ComponentIndex.DOMAIN], $pieces$jscomp$1_uri$$[goog.uri.utils.ComponentIndex.PORT]);
};
goog.uri.utils.getPathAndAfter = function($pieces$jscomp$2_uri$$) {
  $pieces$jscomp$2_uri$$ = goog.uri.utils.split($pieces$jscomp$2_uri$$);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, $pieces$jscomp$2_uri$$[goog.uri.utils.ComponentIndex.PATH], $pieces$jscomp$2_uri$$[goog.uri.utils.ComponentIndex.QUERY_DATA], $pieces$jscomp$2_uri$$[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.removeFragment = function($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? $uri$$ : $uri$$.slice(0, $hashIndex$$);
};
goog.uri.utils.haveSameDomain = function($pieces1_uri1$$, $pieces2_uri2$$) {
  $pieces1_uri1$$ = goog.uri.utils.split($pieces1_uri1$$);
  $pieces2_uri2$$ = goog.uri.utils.split($pieces2_uri2$$);
  return $pieces1_uri1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2_uri2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1_uri1$$[goog.uri.utils.ComponentIndex.SCHEME] == $pieces2_uri2$$[goog.uri.utils.ComponentIndex.SCHEME] && $pieces1_uri1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2_uri2$$[goog.uri.utils.ComponentIndex.PORT];
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function($uri$$) {
  goog.asserts.assert(0 > $uri$$.indexOf("#") && 0 > $uri$$.indexOf("?"), "goog.uri.utils: Fragment or query identifiers are not supported: [%s]", $uri$$);
};
goog.uri.utils.parseQueryData = function($encodedQuery_pairs$$, $callback$$) {
  if ($encodedQuery_pairs$$) {
    $encodedQuery_pairs$$ = $encodedQuery_pairs$$.split("&");
    for (var $i$$ = 0; $i$$ < $encodedQuery_pairs$$.length; $i$$++) {
      var $indexOfEquals$$ = $encodedQuery_pairs$$[$i$$].indexOf("="), $value$$ = null;
      if (0 <= $indexOfEquals$$) {
        var $name$$ = $encodedQuery_pairs$$[$i$$].substring(0, $indexOfEquals$$);
        $value$$ = $encodedQuery_pairs$$[$i$$].substring($indexOfEquals$$ + 1);
      } else {
        $name$$ = $encodedQuery_pairs$$[$i$$];
      }
      $callback$$($name$$, $value$$ ? goog.string.urlDecode($value$$) : "");
    }
  }
};
goog.uri.utils.splitQueryData_ = function($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  0 > $hashIndex$$ && ($hashIndex$$ = $uri$$.length);
  var $questionIndex$$ = $uri$$.indexOf("?");
  if (0 > $questionIndex$$ || $questionIndex$$ > $hashIndex$$) {
    $questionIndex$$ = $hashIndex$$;
    var $queryData$$ = "";
  } else {
    $queryData$$ = $uri$$.substring($questionIndex$$ + 1, $hashIndex$$);
  }
  return [$uri$$.slice(0, $questionIndex$$), $queryData$$, $uri$$.slice($hashIndex$$)];
};
goog.uri.utils.joinQueryData_ = function($parts$$) {
  return $parts$$[0] + ($parts$$[1] ? "?" + $parts$$[1] : "") + $parts$$[2];
};
goog.uri.utils.appendQueryData_ = function($queryData$$, $newData$$) {
  return $newData$$ ? $queryData$$ ? $queryData$$ + "&" + $newData$$ : $newData$$ : $queryData$$;
};
goog.uri.utils.appendQueryDataToUri_ = function($parts$jscomp$9_uri$$, $queryData$$) {
  if (!$queryData$$) {
    return $parts$jscomp$9_uri$$;
  }
  $parts$jscomp$9_uri$$ = goog.uri.utils.splitQueryData_($parts$jscomp$9_uri$$);
  $parts$jscomp$9_uri$$[1] = goog.uri.utils.appendQueryData_($parts$jscomp$9_uri$$[1], $queryData$$);
  return goog.uri.utils.joinQueryData_($parts$jscomp$9_uri$$);
};
goog.uri.utils.appendKeyValuePairs_ = function($key$$, $value$$, $pairs$$) {
  goog.asserts.assertString($key$$);
  if (Array.isArray($value$$)) {
    goog.asserts.assertArray($value$$);
    for (var $j$$ = 0; $j$$ < $value$$.length; $j$$++) {
      goog.uri.utils.appendKeyValuePairs_($key$$, String($value$$[$j$$]), $pairs$$);
    }
  } else {
    null != $value$$ && $pairs$$.push($key$$ + ("" === $value$$ ? "" : "=" + goog.string.urlEncode($value$$)));
  }
};
goog.uri.utils.buildQueryData = function($keysAndValues$$, $i$$) {
  goog.asserts.assert(0 == Math.max($keysAndValues$$.length - ($i$$ || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  var $params$$ = [];
  for ($i$$ = $i$$ || 0; $i$$ < $keysAndValues$$.length; $i$$ += 2) {
    goog.uri.utils.appendKeyValuePairs_($keysAndValues$$[$i$$], $keysAndValues$$[$i$$ + 1], $params$$);
  }
  return $params$$.join("&");
};
goog.uri.utils.buildQueryDataFromMap = function($map$$) {
  var $params$$ = [], $key$$;
  for ($key$$ in $map$$) {
    goog.uri.utils.appendKeyValuePairs_($key$$, $map$$[$key$$], $params$$);
  }
  return $params$$.join("&");
};
goog.uri.utils.appendParams = function($uri$$, $var_args$$) {
  var $queryData$$ = 2 == arguments.length ? goog.uri.utils.buildQueryData(arguments[1], 0) : goog.uri.utils.buildQueryData(arguments, 1);
  return goog.uri.utils.appendQueryDataToUri_($uri$$, $queryData$$);
};
goog.uri.utils.appendParamsFromMap = function($uri$$, $map$jscomp$8_queryData$$) {
  $map$jscomp$8_queryData$$ = goog.uri.utils.buildQueryDataFromMap($map$jscomp$8_queryData$$);
  return goog.uri.utils.appendQueryDataToUri_($uri$$, $map$jscomp$8_queryData$$);
};
goog.uri.utils.appendParam = function($uri$$, $key$$, $opt_value$jscomp$10_value$$) {
  $opt_value$jscomp$10_value$$ = null != $opt_value$jscomp$10_value$$ ? "=" + goog.string.urlEncode($opt_value$jscomp$10_value$$) : "";
  return goog.uri.utils.appendQueryDataToUri_($uri$$, $key$$ + $opt_value$jscomp$10_value$$);
};
goog.uri.utils.findParam_ = function($uri$$, $index$$, $keyEncoded$$, $hashOrEndIndex$$) {
  for (var $keyLength$$ = $keyEncoded$$.length; 0 <= ($index$$ = $uri$$.indexOf($keyEncoded$$, $index$$)) && $index$$ < $hashOrEndIndex$$;) {
    var $followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$ - 1);
    if ($followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.QUESTION) {
      if ($followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$ + $keyLength$$), !$followingChar_precedingChar$$ || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.EQUAL || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.HASH) {
        return $index$$;
      }
    }
    $index$$ += $keyLength$$ + 1;
  }
  return -1;
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function($uri$$, $keyEncoded$$) {
  return 0 <= goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $uri$$.search(goog.uri.utils.hashOrEndRe_));
};
goog.uri.utils.getParamValue = function($uri$$, $keyEncoded$$) {
  var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $foundIndex$$ = goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $hashOrEndIndex$$);
  if (0 > $foundIndex$$) {
    return null;
  }
  var $endPosition$$ = $uri$$.indexOf("&", $foundIndex$$);
  if (0 > $endPosition$$ || $endPosition$$ > $hashOrEndIndex$$) {
    $endPosition$$ = $hashOrEndIndex$$;
  }
  $foundIndex$$ += $keyEncoded$$.length + 1;
  return goog.string.urlDecode($uri$$.slice($foundIndex$$, -1 !== $endPosition$$ ? $endPosition$$ : 0));
};
goog.uri.utils.getParamValues = function($uri$$, $keyEncoded$$) {
  for (var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $result$$ = []; 0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $position$$ = $uri$$.indexOf("&", $foundIndex$$);
    if (0 > $position$$ || $position$$ > $hashOrEndIndex$$) {
      $position$$ = $hashOrEndIndex$$;
    }
    $foundIndex$$ += $keyEncoded$$.length + 1;
    $result$$.push(goog.string.urlDecode($uri$$.slice($foundIndex$$, Math.max($position$$, 0))));
  }
  return $result$$;
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function($uri$$, $keyEncoded$$) {
  for (var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $buffer$$ = []; 0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $buffer$$.push($uri$$.substring($position$$, $foundIndex$$)), $position$$ = Math.min($uri$$.indexOf("&", $foundIndex$$) + 1 || $hashOrEndIndex$$, $hashOrEndIndex$$);
  }
  $buffer$$.push($uri$$.slice($position$$));
  return $buffer$$.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1");
};
goog.uri.utils.setParam = function($uri$$, $keyEncoded$$, $value$$) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam($uri$$, $keyEncoded$$), $keyEncoded$$, $value$$);
};
goog.uri.utils.setParamsFromMap = function($parts$jscomp$10_uri$$, $params$$) {
  $parts$jscomp$10_uri$$ = goog.uri.utils.splitQueryData_($parts$jscomp$10_uri$$);
  var $queryData$$ = $parts$jscomp$10_uri$$[1], $buffer$$ = [];
  $queryData$$ && $queryData$$.split("&").forEach(function($pair$$) {
    var $indexOfEquals$jscomp$1_name$$ = $pair$$.indexOf("=");
    $indexOfEquals$jscomp$1_name$$ = 0 <= $indexOfEquals$jscomp$1_name$$ ? $pair$$.slice(0, $indexOfEquals$jscomp$1_name$$) : $pair$$;
    $params$$.hasOwnProperty($indexOfEquals$jscomp$1_name$$) || $buffer$$.push($pair$$);
  });
  $parts$jscomp$10_uri$$[1] = goog.uri.utils.appendQueryData_($buffer$$.join("&"), goog.uri.utils.buildQueryDataFromMap($params$$));
  return goog.uri.utils.joinQueryData_($parts$jscomp$10_uri$$);
};
goog.uri.utils.appendPath = function($baseUri$$, $path$$) {
  goog.uri.utils.assertNoFragmentsOrQueries_($baseUri$$);
  goog.string.endsWith($baseUri$$, "/") && ($baseUri$$ = $baseUri$$.slice(0, -1));
  goog.string.startsWith($path$$, "/") && ($path$$ = $path$$.slice(1));
  return "" + $baseUri$$ + "/" + $path$$;
};
goog.uri.utils.setPath = function($parts$jscomp$11_uri$$, $path$$) {
  goog.string.startsWith($path$$, "/") || ($path$$ = "/" + $path$$);
  $parts$jscomp$11_uri$$ = goog.uri.utils.split($parts$jscomp$11_uri$$);
  return goog.uri.utils.buildFromEncodedParts($parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.SCHEME], $parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.USER_INFO], $parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.DOMAIN], $parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.PORT], $path$$, $parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.QUERY_DATA], $parts$jscomp$11_uri$$[goog.uri.utils.ComponentIndex.FRAGMENT]);
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function($uri$$) {
  return goog.uri.utils.setParam($uri$$, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString());
};
goog.Uri = function($opt_uri$$, $opt_ignoreCase$$) {
  this.domain_ = this.userInfo_ = this.scheme_ = "";
  this.port_ = null;
  this.fragment_ = this.path_ = "";
  this.ignoreCase_ = this.isReadOnly_ = !1;
  var $m$$;
  $opt_uri$$ instanceof goog.Uri ? (this.ignoreCase_ = void 0 !== $opt_ignoreCase$$ ? $opt_ignoreCase$$ : $opt_uri$$.getIgnoreCase(), this.setScheme($opt_uri$$.getScheme()), this.setUserInfo($opt_uri$$.getUserInfo()), this.setDomain($opt_uri$$.getDomain()), this.setPort($opt_uri$$.getPort()), this.setPath($opt_uri$$.getPath()), this.setQueryData($opt_uri$$.getQueryData().clone()), this.setFragment($opt_uri$$.getFragment())) : $opt_uri$$ && ($m$$ = goog.uri.utils.split(String($opt_uri$$))) ? (this.ignoreCase_ =
  !!$opt_ignoreCase$$, this.setScheme($m$$[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo($m$$[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain($m$$[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort($m$$[goog.uri.utils.ComponentIndex.PORT]), this.setPath($m$$[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQueryData($m$$[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment($m$$[goog.uri.utils.ComponentIndex.FRAGMENT] ||
  "", !0)) : (this.ignoreCase_ = !!$opt_ignoreCase$$, this.queryData_ = new goog.Uri.QueryData(null, this.ignoreCase_));
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.toString = function() {
  var $out$$ = [], $scheme$$ = this.getScheme();
  $scheme$$ && $out$$.push(goog.Uri.encodeSpecialChars_($scheme$$, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), ":");
  var $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ = this.getDomain();
  if ($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ || "file" == $scheme$$) {
    $out$$.push("//"), ($scheme$$ = this.getUserInfo()) && $out$$.push(goog.Uri.encodeSpecialChars_($scheme$$, goog.Uri.reDisallowedInSchemeOrUserInfo_, !0), "@"), $out$$.push(goog.Uri.removeDoubleEncoding_(goog.string.urlEncode($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$))), $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ = this.getPort(), null != $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ && $out$$.push(":", String($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$));
  }
  if ($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ = this.getPath()) {
    this.hasDomain() && "/" != $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$.charAt(0) && $out$$.push("/"), $out$$.push(goog.Uri.encodeSpecialChars_($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$, "/" == $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_, !0));
  }
  ($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ = this.getEncodedQuery()) && $out$$.push("?", $domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$);
  ($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$ = this.getFragment()) && $out$$.push("#", goog.Uri.encodeSpecialChars_($domain$jscomp$2_fragment$jscomp$1_path$jscomp$21_port_query$$, goog.Uri.reDisallowedInFragment_));
  return $out$$.join("");
};
goog.Uri.prototype.resolve = function($relativeUri$$) {
  var $absoluteUri$$ = this.clone(), $overridden$$ = $relativeUri$$.hasScheme();
  $overridden$$ ? $absoluteUri$$.setScheme($relativeUri$$.getScheme()) : $overridden$$ = $relativeUri$$.hasUserInfo();
  $overridden$$ ? $absoluteUri$$.setUserInfo($relativeUri$$.getUserInfo()) : $overridden$$ = $relativeUri$$.hasDomain();
  $overridden$$ ? $absoluteUri$$.setDomain($relativeUri$$.getDomain()) : $overridden$$ = $relativeUri$$.hasPort();
  var $path$$ = $relativeUri$$.getPath();
  if ($overridden$$) {
    $absoluteUri$$.setPort($relativeUri$$.getPort());
  } else {
    if ($overridden$$ = $relativeUri$$.hasPath()) {
      if ("/" != $path$$.charAt(0)) {
        if (this.hasDomain() && !this.hasPath()) {
          $path$$ = "/" + $path$$;
        } else {
          var $lastSlashIndex$$ = $absoluteUri$$.getPath().lastIndexOf("/");
          -1 != $lastSlashIndex$$ && ($path$$ = $absoluteUri$$.getPath().slice(0, $lastSlashIndex$$ + 1) + $path$$);
        }
      }
      $path$$ = goog.Uri.removeDotSegments($path$$);
    }
  }
  $overridden$$ ? $absoluteUri$$.setPath($path$$) : $overridden$$ = $relativeUri$$.hasQuery();
  $overridden$$ ? $absoluteUri$$.setQueryData($relativeUri$$.getQueryData().clone()) : $overridden$$ = $relativeUri$$.hasFragment();
  $overridden$$ && $absoluteUri$$.setFragment($relativeUri$$.getFragment());
  return $absoluteUri$$;
};
goog.Uri.prototype.clone = function() {
  return new goog.Uri(this);
};
goog.Uri.prototype.getScheme = function() {
  return this.scheme_;
};
goog.Uri.prototype.setScheme = function($newScheme$$, $opt_decode$$) {
  this.enforceReadOnly();
  if (this.scheme_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newScheme$$, !0) : $newScheme$$) {
    this.scheme_ = this.scheme_.replace(/:$/, "");
  }
  return this;
};
goog.Uri.prototype.hasScheme = function() {
  return !!this.scheme_;
};
goog.Uri.prototype.getUserInfo = function() {
  return this.userInfo_;
};
goog.Uri.prototype.setUserInfo = function($newUserInfo$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.userInfo_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newUserInfo$$) : $newUserInfo$$;
  return this;
};
goog.Uri.prototype.hasUserInfo = function() {
  return !!this.userInfo_;
};
goog.Uri.prototype.getDomain = function() {
  return this.domain_;
};
goog.Uri.prototype.setDomain = function($newDomain$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.domain_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newDomain$$, !0) : $newDomain$$;
  return this;
};
goog.Uri.prototype.hasDomain = function() {
  return !!this.domain_;
};
goog.Uri.prototype.getPort = function() {
  return this.port_;
};
goog.Uri.prototype.setPort = function($newPort$$) {
  this.enforceReadOnly();
  if ($newPort$$) {
    $newPort$$ = Number($newPort$$);
    if (isNaN($newPort$$) || 0 > $newPort$$) {
      throw Error("Bad port number " + $newPort$$);
    }
    this.port_ = $newPort$$;
  } else {
    this.port_ = null;
  }
  return this;
};
goog.Uri.prototype.hasPort = function() {
  return null != this.port_;
};
goog.Uri.prototype.getPath = function() {
  return this.path_;
};
goog.Uri.prototype.setPath = function($newPath$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.path_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newPath$$, !0) : $newPath$$;
  return this;
};
goog.Uri.prototype.hasPath = function() {
  return !!this.path_;
};
goog.Uri.prototype.hasQuery = function() {
  return "" !== this.queryData_.toString();
};
goog.Uri.prototype.setQueryData = function($queryData$$, $opt_decode$$) {
  this.enforceReadOnly();
  $queryData$$ instanceof goog.Uri.QueryData ? (this.queryData_ = $queryData$$, this.queryData_.setIgnoreCase(this.ignoreCase_)) : ($opt_decode$$ || ($queryData$$ = goog.Uri.encodeSpecialChars_($queryData$$, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData($queryData$$, this.ignoreCase_));
  return this;
};
goog.Uri.prototype.setQuery = function($newQuery$$, $opt_decode$$) {
  return this.setQueryData($newQuery$$, $opt_decode$$);
};
goog.Uri.prototype.getEncodedQuery = function() {
  return this.queryData_.toString();
};
goog.Uri.prototype.getDecodedQuery = function() {
  return this.queryData_.toDecodedString();
};
goog.Uri.prototype.getQueryData = function() {
  return this.queryData_;
};
goog.Uri.prototype.getQuery = function() {
  return this.getEncodedQuery();
};
goog.Uri.prototype.setParameterValue = function($key$$, $value$$) {
  this.enforceReadOnly();
  this.queryData_.set($key$$, $value$$);
  return this;
};
goog.Uri.prototype.setParameterValues = function($key$$, $values$$) {
  this.enforceReadOnly();
  Array.isArray($values$$) || ($values$$ = [String($values$$)]);
  this.queryData_.setValues($key$$, $values$$);
  return this;
};
goog.Uri.prototype.getParameterValues = function($name$$) {
  return this.queryData_.getValues($name$$);
};
goog.Uri.prototype.getParameterValue = function($paramName$$) {
  return this.queryData_.get($paramName$$);
};
goog.Uri.prototype.getFragment = function() {
  return this.fragment_;
};
goog.Uri.prototype.setFragment = function($newFragment$$, $opt_decode$$) {
  this.enforceReadOnly();
  this.fragment_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newFragment$$) : $newFragment$$;
  return this;
};
goog.Uri.prototype.hasFragment = function() {
  return !!this.fragment_;
};
goog.Uri.prototype.hasSameDomainAs = function($uri2$$) {
  return (!this.hasDomain() && !$uri2$$.hasDomain() || this.getDomain() == $uri2$$.getDomain()) && (!this.hasPort() && !$uri2$$.hasPort() || this.getPort() == $uri2$$.getPort());
};
goog.Uri.prototype.makeUnique = function() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this;
};
goog.Uri.prototype.removeParameter = function($key$$) {
  this.enforceReadOnly();
  this.queryData_.remove($key$$);
  return this;
};
goog.Uri.prototype.setReadOnly = function($isReadOnly$$) {
  this.isReadOnly_ = $isReadOnly$$;
  return this;
};
goog.Uri.prototype.isReadOnly = function() {
  return this.isReadOnly_;
};
goog.Uri.prototype.enforceReadOnly = function() {
  if (this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function($ignoreCase$$) {
  this.ignoreCase_ = $ignoreCase$$;
  this.queryData_ && this.queryData_.setIgnoreCase($ignoreCase$$);
  return this;
};
goog.Uri.prototype.getIgnoreCase = function() {
  return this.ignoreCase_;
};
goog.Uri.parse = function($uri$$, $opt_ignoreCase$$) {
  return $uri$$ instanceof goog.Uri ? $uri$$.clone() : new goog.Uri($uri$$, $opt_ignoreCase$$);
};
goog.Uri.create = function($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_query$$, $opt_fragment$$, $opt_ignoreCase$jscomp$2_uri$$) {
  $opt_ignoreCase$jscomp$2_uri$$ = new goog.Uri(null, $opt_ignoreCase$jscomp$2_uri$$);
  $opt_scheme$$ && $opt_ignoreCase$jscomp$2_uri$$.setScheme($opt_scheme$$);
  $opt_userInfo$$ && $opt_ignoreCase$jscomp$2_uri$$.setUserInfo($opt_userInfo$$);
  $opt_domain$$ && $opt_ignoreCase$jscomp$2_uri$$.setDomain($opt_domain$$);
  $opt_port$$ && $opt_ignoreCase$jscomp$2_uri$$.setPort($opt_port$$);
  $opt_path$$ && $opt_ignoreCase$jscomp$2_uri$$.setPath($opt_path$$);
  $opt_query$$ && $opt_ignoreCase$jscomp$2_uri$$.setQueryData($opt_query$$);
  $opt_fragment$$ && $opt_ignoreCase$jscomp$2_uri$$.setFragment($opt_fragment$$);
  return $opt_ignoreCase$jscomp$2_uri$$;
};
goog.Uri.resolve = function($base$$, $rel$$) {
  $base$$ instanceof goog.Uri || ($base$$ = goog.Uri.parse($base$$));
  $rel$$ instanceof goog.Uri || ($rel$$ = goog.Uri.parse($rel$$));
  return $base$$.resolve($rel$$);
};
goog.Uri.removeDotSegments = function($path$jscomp$23_segments$$) {
  if (".." == $path$jscomp$23_segments$$ || "." == $path$jscomp$23_segments$$) {
    return "";
  }
  if (goog.string.contains($path$jscomp$23_segments$$, "./") || goog.string.contains($path$jscomp$23_segments$$, "/.")) {
    var $leadingSlash$$ = goog.string.startsWith($path$jscomp$23_segments$$, "/");
    $path$jscomp$23_segments$$ = $path$jscomp$23_segments$$.split("/");
    for (var $out$$ = [], $pos$$ = 0; $pos$$ < $path$jscomp$23_segments$$.length;) {
      var $segment$$ = $path$jscomp$23_segments$$[$pos$$++];
      "." == $segment$$ ? $leadingSlash$$ && $pos$$ == $path$jscomp$23_segments$$.length && $out$$.push("") : ".." == $segment$$ ? ((1 < $out$$.length || 1 == $out$$.length && "" != $out$$[0]) && $out$$.pop(), $leadingSlash$$ && $pos$$ == $path$jscomp$23_segments$$.length && $out$$.push("")) : ($out$$.push($segment$$), $leadingSlash$$ = !0);
    }
    return $out$$.join("/");
  }
  return $path$jscomp$23_segments$$;
};
goog.Uri.decodeOrEmpty_ = function($val$$, $opt_preserveReserved$$) {
  return $val$$ ? $opt_preserveReserved$$ ? decodeURI($val$$.replace(/%25/g, "%2525")) : decodeURIComponent($val$$) : "";
};
goog.Uri.encodeSpecialChars_ = function($encoded_unescapedPart$$, $extra$$, $opt_removeDoubleEncoding$$) {
  return "string" === typeof $encoded_unescapedPart$$ ? ($encoded_unescapedPart$$ = encodeURI($encoded_unescapedPart$$).replace($extra$$, goog.Uri.encodeChar_), $opt_removeDoubleEncoding$$ && ($encoded_unescapedPart$$ = goog.Uri.removeDoubleEncoding_($encoded_unescapedPart$$)), $encoded_unescapedPart$$) : null;
};
goog.Uri.encodeChar_ = function($ch$jscomp$4_n$$) {
  $ch$jscomp$4_n$$ = $ch$jscomp$4_n$$.charCodeAt(0);
  return "%" + ($ch$jscomp$4_n$$ >> 4 & 15).toString(16) + ($ch$jscomp$4_n$$ & 15).toString(16);
};
goog.Uri.removeDoubleEncoding_ = function($doubleEncodedString$$) {
  return $doubleEncodedString$$.replace(/%25([0-9a-fA-F]{2})/g, "%$1");
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function($pieces1$$, $pieces2$$) {
  $pieces1$$ = goog.uri.utils.split($pieces1$$);
  $pieces2$$ = goog.uri.utils.split($pieces2$$);
  return $pieces1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2$$[goog.uri.utils.ComponentIndex.PORT];
};
goog.Uri.QueryData = function($opt_query$$, $opt_ignoreCase$$) {
  this.count_ = this.keyMap_ = null;
  this.encodedQuery_ = $opt_query$$ || null;
  this.ignoreCase_ = !!$opt_ignoreCase$$;
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function() {
  if (!this.keyMap_ && (this.keyMap_ = new Map(), this.count_ = 0, this.encodedQuery_)) {
    var $self$$ = this;
    goog.uri.utils.parseQueryData(this.encodedQuery_, function($name$$, $value$$) {
      $self$$.add(goog.string.urlDecode($name$$), $value$$);
    });
  }
};
goog.Uri.QueryData.createFromMap = function($map$jscomp$9_values$$, $opt_ignoreCase$jscomp$4_queryData$$) {
  var $keys$$ = goog.structs.getKeys($map$jscomp$9_values$$);
  if ("undefined" == typeof $keys$$) {
    throw Error("Keys are undefined");
  }
  $opt_ignoreCase$jscomp$4_queryData$$ = new goog.Uri.QueryData(null, $opt_ignoreCase$jscomp$4_queryData$$);
  $map$jscomp$9_values$$ = goog.structs.getValues($map$jscomp$9_values$$);
  for (var $i$$ = 0; $i$$ < $keys$$.length; $i$$++) {
    var $key$$ = $keys$$[$i$$], $value$$ = $map$jscomp$9_values$$[$i$$];
    Array.isArray($value$$) ? $opt_ignoreCase$jscomp$4_queryData$$.setValues($key$$, $value$$) : $opt_ignoreCase$jscomp$4_queryData$$.add($key$$, $value$$);
  }
  return $opt_ignoreCase$jscomp$4_queryData$$;
};
goog.Uri.QueryData.createFromKeysValues = function($keys$$, $values$$, $opt_ignoreCase$jscomp$5_queryData$$) {
  if ($keys$$.length != $values$$.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  $opt_ignoreCase$jscomp$5_queryData$$ = new goog.Uri.QueryData(null, $opt_ignoreCase$jscomp$5_queryData$$);
  for (var $i$$ = 0; $i$$ < $keys$$.length; $i$$++) {
    $opt_ignoreCase$jscomp$5_queryData$$.add($keys$$[$i$$], $values$$[$i$$]);
  }
  return $opt_ignoreCase$jscomp$5_queryData$$;
};
goog.Uri.QueryData.prototype.getCount = function() {
  this.ensureKeyMapInitialized_();
  return this.count_;
};
goog.Uri.QueryData.prototype.add = function($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  var $values$$ = this.keyMap_.get($key$$);
  $values$$ || this.keyMap_.set($key$$, $values$$ = []);
  $values$$.push($value$$);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.remove = function($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  return this.keyMap_.has($key$$) ? (this.invalidateCache_(), this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get($key$$).length, this.keyMap_.delete($key$$)) : !1;
};
goog.Uri.QueryData.prototype.clear = function() {
  this.invalidateCache_();
  this.keyMap_ = null;
  this.count_ = 0;
};
goog.Uri.QueryData.prototype.isEmpty = function() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_;
};
goog.Uri.QueryData.prototype.containsKey = function($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  return this.keyMap_.has($key$$);
};
goog.Uri.QueryData.prototype.containsValue = function($value$$) {
  var $vals$$ = this.getValues();
  return module$contents$goog$array_contains($vals$$, $value$$);
};
goog.Uri.QueryData.prototype.forEach = function($f$$, $opt_scope$$) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function($values$$, $key$$) {
    $values$$.forEach(function($value$$) {
      $f$$.call($opt_scope$$, $value$$, $key$$, this);
    }, this);
  }, this);
};
goog.Uri.QueryData.prototype.getKeys = function() {
  this.ensureKeyMapInitialized_();
  const $vals$$ = Array.from(this.keyMap_.values()), $keys$$ = Array.from(this.keyMap_.keys()), $rv$$ = [];
  for (let $i$$ = 0; $i$$ < $keys$$.length; $i$$++) {
    const $val$$ = $vals$$[$i$$];
    for (let $j$$ = 0; $j$$ < $val$$.length; $j$$++) {
      $rv$$.push($keys$$[$i$$]);
    }
  }
  return $rv$$;
};
goog.Uri.QueryData.prototype.getValues = function($opt_key$jscomp$2_values$$) {
  this.ensureKeyMapInitialized_();
  let $rv$$ = [];
  if ("string" === typeof $opt_key$jscomp$2_values$$) {
    this.containsKey($opt_key$jscomp$2_values$$) && ($rv$$ = $rv$$.concat(this.keyMap_.get(this.getKeyName_($opt_key$jscomp$2_values$$))));
  } else {
    $opt_key$jscomp$2_values$$ = Array.from(this.keyMap_.values());
    for (let $i$$ = 0; $i$$ < $opt_key$jscomp$2_values$$.length; $i$$++) {
      $rv$$ = $rv$$.concat($opt_key$jscomp$2_values$$[$i$$]);
    }
  }
  return $rv$$;
};
goog.Uri.QueryData.prototype.set = function($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  this.containsKey($key$$) && (this.count_ = goog.asserts.assertNumber(this.count_) - this.keyMap_.get($key$$).length);
  this.keyMap_.set($key$$, [$value$$]);
  this.count_ = goog.asserts.assertNumber(this.count_) + 1;
  return this;
};
goog.Uri.QueryData.prototype.get = function($key$jscomp$99_values$$, $opt_default$$) {
  if (!$key$jscomp$99_values$$) {
    return $opt_default$$;
  }
  $key$jscomp$99_values$$ = this.getValues($key$jscomp$99_values$$);
  return 0 < $key$jscomp$99_values$$.length ? String($key$jscomp$99_values$$[0]) : $opt_default$$;
};
goog.Uri.QueryData.prototype.setValues = function($key$$, $values$$) {
  this.remove($key$$);
  0 < $values$$.length && (this.invalidateCache_(), this.keyMap_.set(this.getKeyName_($key$$), module$contents$goog$array_toArray($values$$)), this.count_ = goog.asserts.assertNumber(this.count_) + $values$$.length);
};
goog.Uri.QueryData.prototype.toString = function() {
  if (this.encodedQuery_) {
    return this.encodedQuery_;
  }
  if (!this.keyMap_) {
    return "";
  }
  const $sb$$ = [], $keys$$ = Array.from(this.keyMap_.keys());
  for (var $i$$ = 0; $i$$ < $keys$$.length; $i$$++) {
    var $j$jscomp$8_key$$ = $keys$$[$i$$];
    const $encodedKey$$ = goog.string.urlEncode($j$jscomp$8_key$$), $val$$ = this.getValues($j$jscomp$8_key$$);
    for ($j$jscomp$8_key$$ = 0; $j$jscomp$8_key$$ < $val$$.length; $j$jscomp$8_key$$++) {
      var $param$$ = $encodedKey$$;
      "" !== $val$$[$j$jscomp$8_key$$] && ($param$$ += "=" + goog.string.urlEncode($val$$[$j$jscomp$8_key$$]));
      $sb$$.push($param$$);
    }
  }
  return this.encodedQuery_ = $sb$$.join("&");
};
goog.Uri.QueryData.prototype.toDecodedString = function() {
  return goog.Uri.decodeOrEmpty_(this.toString());
};
goog.Uri.QueryData.prototype.invalidateCache_ = function() {
  this.encodedQuery_ = null;
};
goog.Uri.QueryData.prototype.filterKeys = function($keys$$) {
  this.ensureKeyMapInitialized_();
  this.keyMap_.forEach(function($value$$, $key$$) {
    module$contents$goog$array_contains($keys$$, $key$$) || this.remove($key$$);
  }, this);
  return this;
};
goog.Uri.QueryData.prototype.clone = function() {
  var $rv$$ = new goog.Uri.QueryData();
  $rv$$.encodedQuery_ = this.encodedQuery_;
  this.keyMap_ && ($rv$$.keyMap_ = new Map(this.keyMap_), $rv$$.count_ = this.count_);
  return $rv$$;
};
goog.Uri.QueryData.prototype.getKeyName_ = function($arg$$) {
  $arg$$ = String($arg$$);
  this.ignoreCase_ && ($arg$$ = $arg$$.toLowerCase());
  return $arg$$;
};
goog.Uri.QueryData.prototype.setIgnoreCase = function($ignoreCase$$) {
  $ignoreCase$$ && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), this.keyMap_.forEach(function($value$$, $key$$) {
    var $lowerCase$$ = $key$$.toLowerCase();
    $key$$ != $lowerCase$$ && (this.remove($key$$), this.setValues($lowerCase$$, $value$$));
  }, this));
  this.ignoreCase_ = $ignoreCase$$;
};
goog.Uri.QueryData.prototype.extend = function($var_args$$) {
  for (var $i$$ = 0; $i$$ < arguments.length; $i$$++) {
    goog.structs.forEach(arguments[$i$$], function($value$$, $key$$) {
      this.add($key$$, $value$$);
    }, this);
  }
};

