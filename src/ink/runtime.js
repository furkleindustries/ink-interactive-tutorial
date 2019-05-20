/* eslint-disable */
! function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).inkjs = {})
}(this, function(t) {
  "use strict";
  class e {
      constructor() {
          if (this._components = [], this._componentsString = null, this._isRelative = !1, "string" == typeof arguments[0]) {
              let t = arguments[0];
              this.componentsString = t
          } else if (arguments[0] instanceof e.Component && arguments[1] instanceof e) {
              let t = arguments[0],
                  e = arguments[1];
              this._components.push(t), this._components = this._components.concat(e._components)
          } else if (Array.isArray(arguments[0])) {
              let t = arguments[0],
                  e = !!arguments[1];
              this._components = this._components.concat(t), this._isRelative = e
          }
      }
      get isRelative() {
          return this._isRelative
      }
      get componentCount() {
          return this._components.length
      }
      get head() {
          return this._components.length > 0 ? this._components[0] : null
      }
      get tail() {
          if (this._components.length >= 2) {
              let t = this._components.slice(1, this._components.length);
              return new e(t)
          }
          return e.self
      }
      get length() {
          return this._components.length
      }
      get lastComponent() {
          let t = this._components.length - 1;
          return t >= 0 ? this._components[t] : null
      }
      get containsNamedComponent() {
          for (let t = 0, e = this._components.length; t < e; t++)
              if (!this._components[t].isIndex) return !0;
          return !1
      }
      static get self() {
          let t = new e;
          return t._isRelative = !0, t
      }
      GetComponent(t) {
          return this._components[t]
      }
      PathByAppendingPath(t) {
          let n = new e,
              i = 0;
          for (let e = 0; e < t._components.length && t._components[e].isParent; ++e) i++;
          for (let t = 0; t < this._components.length - i; ++t) n._components.push(this._components[t]);
          for (let e = i; e < t._components.length; ++e) n._components.push(t._components[e]);
          return n
      }
      get componentsString() {
          return null == this._componentsString && (this._componentsString = this._components.join("."), this.isRelative && (this._componentsString = "." + this._componentsString)), this._componentsString
      }
      set componentsString(t) {
          if (this._components.length = 0, this._componentsString = t, null == this._componentsString || "" == this._componentsString) return;
          "." == this._componentsString[0] && (this._isRelative = !0, this._componentsString = this._componentsString.substring(1));
          let n = this._componentsString.split(".");
          for (let t of n) /^(\-|\+)?([0-9]+|Infinity)$/.test(t) ? this._components.push(new e.Component(parseInt(t))) : this._components.push(new e.Component(t))
      }
      toString() {
          return this.componentsString
      }
      Equals(t) {
          if (null == t) return !1;
          if (t._components.length != this._components.length) return !1;
          if (t.isRelative != this.isRelative) return !1;
          for (let e = 0, n = t._components.length; e < n; e++)
              if (!t._components[e].Equals(this._components[e])) return !1;
          return !0
      }
      PathByAppendingComponent(t) {
          let n = new e;
          return n._components.push.apply(n._components, this._components), n._components.push(t), n
      }
  }
  var n, i, a;

  function r(t, e) {
      return t instanceof e ? h(t, e) : null
  }

  function s(t, e) {
      if (t instanceof e) return h(t, e);
      throw new Error(`${t} is not of type ${e}`)
  }

  function l(t) {
      if ("number" == typeof t) return t;
      throw new Error(`${t} is not a number`)
  }

  function o(t) {
      return t.hasValidName && t.name ? t : null
  }

  function u(t) {
      return void 0 === t ? null : t
  }

  function h(t, e) {
      return t
  }
  e.parentId = "^",
      function(t) {
          class e {
              constructor(t) {
                  this.index = -1, this.name = null, "string" == typeof t ? this.name = t : this.index = t
              }
              get isIndex() {
                  return this.index >= 0
              }
              get isParent() {
                  return this.name == t.parentId
              }
              static ToParent() {
                  return new e(t.parentId)
              }
              toString() {
                  return this.isIndex ? this.index.toString() : this.name
              }
              Equals(t) {
                  return null != t && t.isIndex == this.isIndex && (this.isIndex ? this.index == t.index : this.name == t.name)
              }
          }
          t.Component = e
      }(e || (e = {})),
      function(t) {
          function e(t, e) {
              if (!t) throw void 0 !== e && console.warn(e), console.trace && console.trace(), ""
          }
          t.AssertType = function(t, n, i) {
              e(t instanceof n, i)
          }, t.Assert = e
      }(n || (n = {}));
  class c extends Error {}

  function d(t) {
      throw new c(`${t} is null or undefined`)
  }
  class p {
      constructor() {
          this.parent = null, this._debugMetadata = null, this._path = null
      }
      get debugMetadata() {
          return null === this._debugMetadata && this.parent ? this.parent.debugMetadata : this._debugMetadata
      }
      set debugMetadata(t) {
          this._debugMetadata = t
      }
      get ownDebugMetadata() {
          return this._debugMetadata
      }
      DebugLineNumberOfPath(t) {
          if (null === t) return null;
          let e = this.rootContentContainer;
          if (e) {
              let n = e.ContentAtPath(t).obj;
              if (n) {
                  let t = n.debugMetadata;
                  if (null !== t) return t.startLineNumber
              }
          }
          return null
      }
      get path() {
          if (null == this._path)
              if (null == this.parent) this._path = new e;
              else {
                  let t = [],
                      n = this,
                      i = r(n.parent, O);
                  for (; null !== i;) {
                      let a = o(n);
                      null != a && a.hasValidName ? t.unshift(new e.Component(a.name)) : t.unshift(new e.Component(i.content.indexOf(n))), n = i, i = r(i.parent, O)
                  }
                  this._path = new e(t)
              } return this._path
      }
      ResolvePath(t) {
          if (null === t) return d("path");
          if (t.isRelative) {
              let e = r(this, O);
              return null === e && (n.Assert(null !== this.parent, "Can't resolve relative path because we don't have a parent"), e = r(this.parent, O), n.Assert(null !== e, "Expected parent to be a container"), n.Assert(t.GetComponent(0).isParent), t = t.tail), null === e ? d("nearestContainer") : e.ContentAtPath(t)
          } {
              let e = this.rootContentContainer;
              return null === e ? d("contentContainer") : e.ContentAtPath(t)
          }
      }
      ConvertPathToRelative(t) {
          let n = this.path,
              i = Math.min(t.length, n.length),
              a = -1;
          for (let e = 0; e < i; ++e) {
              let i = n.GetComponent(e),
                  r = t.GetComponent(e);
              if (!i.Equals(r)) break;
              a = e
          }
          if (-1 == a) return t;
          let r = n.componentCount - 1 - a,
              s = [];
          for (let t = 0; t < r; ++t) s.push(e.Component.ToParent());
          for (let e = a + 1; e < t.componentCount; ++e) s.push(t.GetComponent(e));
          return new e(s, !0)
      }
      CompactPathString(t) {
          let e = null,
              n = null;
          if (t.isRelative) n = t.componentsString, e = this.path.PathByAppendingPath(t).componentsString;
          else {
              n = this.ConvertPathToRelative(t).componentsString, e = t.componentsString
          }
          return n.length < e.length ? n : e
      }
      get rootContentContainer() {
          let t = this;
          for (; t.parent;) t = t.parent;
          return r(t, O)
      }
      Copy() {
          throw Error("Not Implemented: Doesn't support copying")
      }
      SetChild(t, e, n) {
          t[e] && (t[e] = null), t[e] = n, t[e] && (t[e].parent = this)
      }
  }
  class m {
      constructor(t) {
          t = void 0 !== t ? t.toString() : "", this.string = t
      }
      get Length() {
          return this.string.length
      }
      Append(t) {
          null !== t && (this.string += t)
      }
      AppendLine(t) {
          void 0 !== t && this.Append(t), this.string += "\n"
      }
      AppendFormat(t, ...e) {
          this.string += t.replace(/{(\d+)}/g, (t, n) => void 0 !== e[n] ? e[n] : t)
      }
      toString() {
          return this.string
      }
  }
  class f {
      constructor() {
          if (this.originName = null, this.itemName = null, void 0 !== arguments[1]) {
              let t = arguments[0],
                  e = arguments[1];
              this.originName = t, this.itemName = e
          } else if (arguments[0]) {
              let t = arguments[0].toString().split(".");
              this.originName = t[0], this.itemName = t[1]
          }
      }
      static get Null() {
          return new f(null, null)
      }
      get isNull() {
          return null == this.originName && null == this.itemName
      }
      get fullName() {
          return (null !== this.originName ? this.originName : "?") + "." + this.itemName
      }
      toString() {
          return this.fullName
      }
      Equals(t) {
          if (t instanceof f) {
              let e = t;
              return e.itemName == this.itemName && e.originName == this.originName
          }
          return !1
      }
      copy() {
          return new f(this.originName, this.itemName)
      }
      serialized() {
          return JSON.stringify({
              originName: this.originName,
              itemName: this.itemName
          })
      }
      static fromSerializedKey(t) {
          let e = JSON.parse(t);
          if (!f.isLikeInkListItem(e)) return f.Null;
          let n = e;
          return new f(n.originName, n.itemName)
      }
      static isLikeInkListItem(t) {
          return "object" == typeof t && (!(!t.hasOwnProperty("originName") || !t.hasOwnProperty("itemName")) && (("string" == typeof t.originName || null === typeof t.originName) && ("string" == typeof t.itemName || null === typeof t.itemName)))
      }
  }
  class g extends Map {
      constructor() {
          if (super((() => arguments[0] instanceof g ? arguments[0] : void 0)()), this.origins = null, this._originNames = [], arguments[0] instanceof g) {
              let t = arguments[0];
              t._originNames && (this._originNames = t._originNames.slice())
          } else if ("string" == typeof arguments[0]) {
              let t = arguments[0],
                  e = arguments[1];
              this.SetInitialOriginName(t);
              let n = e.listDefinitions.TryListGetDefinition(t, null);
              if (!n.exists) throw new Error("InkList origin could not be found in story when constructing new list: " + t);
              this.origins = [n.result]
          } else if ("object" == typeof arguments[0] && arguments[0].hasOwnProperty("Key") && arguments[0].hasOwnProperty("Value")) {
              let t = arguments[0];
              this.Add(t.Key, t.Value)
          }
      }
      AddItem(t) {
          if (t instanceof f) {
              let e = t;
              if (null == e.originName) return void this.AddItem(e.itemName);
              if (null === this.origins) return d("this.origins");
              for (let t of this.origins)
                  if (t.name == e.originName) {
                      let n = t.TryGetValueForItem(e, 0);
                      if (n.exists) return void this.Add(e, n.result);
                      throw new Error("Could not add the item " + e + " to this list because it doesn't exist in the original list definition in ink.")
                  } throw new Error("Failed to add item to list because the item was from a new list definition that wasn't previously known to this list. Only items from previously known lists can be used, so that the int value can be found.")
          } {
              let e = t,
                  n = null;
              if (null === this.origins) return d("this.origins");
              for (let t of this.origins) {
                  if (null === e) return d("itemName");
                  if (t.ContainsItemWithName(e)) {
                      if (null != n) throw new Error("Could not add the item " + e + " to this list because it could come from either " + t.name + " or " + n.name);
                      n = t
                  }
              }
              if (null == n) throw new Error("Could not add the item " + e + " to this list because it isn't known to any list definitions previously associated with this list.");
              let i = new f(n.name, e),
                  a = n.ValueForItem(i);
              this.Add(i, a)
          }
      }
      ContainsItemNamed(t) {
          for (let [e, n] of this) {
              if (f.fromSerializedKey(e).itemName == t) return !0
          }
          return !1
      }
      ContainsKey(t) {
          return this.has(t.serialized())
      }
      Add(t, e) {
          let n = t.serialized();
          if (this.has(n)) throw new Error(`The Map already contains an entry for ${t}`);
          this.set(n, e)
      }
      Remove(t) {
          return this.delete(t.serialized())
      }
      get Count() {
          return this.size
      }
      get originOfMaxItem() {
          if (null == this.origins) return null;
          let t = this.maxItem.Key.originName,
              e = null;
          return this.origins.every(n => n.name != t || (e = n, !1)), e
      }
      get originNames() {
          if (this.Count > 0) {
              null == this._originNames && this.Count > 0 ? this._originNames = [] : (this._originNames || (this._originNames = []), this._originNames.length = 0);
              for (let [t, e] of this) {
                  let ___y = f.fromSerializedKey(t);
                  if (null === ___y.originName) return d("item.originName");
                  this._originNames.push(___y.originName)
              }
          }
          return this._originNames
      }
      SetInitialOriginName(t) {
          this._originNames = [t]
      }
      SetInitialOriginNames(t) {
          this._originNames = null == t ? null : t.slice()
      }
      get maxItem() {
          let t = {
              Key: f.Null,
              Value: 0
          };
          for (let [e, n] of this) {
              let i = f.fromSerializedKey(e);
              (t.Key.isNull || n > t.Value) && (t = {
                  Key: i,
                  Value: n
              })
          }
          return t
      }
      get minItem() {
          let t = {
              Key: f.Null,
              Value: 0
          };
          for (let [e, n] of this) {
              let i = f.fromSerializedKey(e);
              (t.Key.isNull || n < t.Value) && (t = {
                  Key: i,
                  Value: n
              })
          }
          return t
      }
      get inverse() {
          let t = new g;
          if (null != this.origins)
              for (let e of this.origins)
                  for (let [n, i] of e.items) {
                      let e = f.fromSerializedKey(n);
                      this.ContainsKey(e) || t.Add(e, i)
                  }
          return t
      }
      get all() {
          let t = new g;
          if (null != this.origins)
              for (let e of this.origins)
                  for (let [n, i] of e.items) {
                      let e = f.fromSerializedKey(n);
                      t.set(e.serialized(), i)
                  }
          return t
      }
      Union(t) {
          let e = new g(this);
          for (let [n, i] of t) e.set(n, i);
          return e
      }
      Intersect(t) {
          let e = new g;
          for (let [n, i] of this) t.has(n) && e.set(n, i);
          return e
      }
      Without(t) {
          let e = new g(this);
          for (let [n, i] of t) e.delete(n);
          return e
      }
      Contains(t) {
          for (let [e, n] of t)
              if (!this.has(e)) return !1;
          return !0
      }
      GreaterThan(t) {
          return 0 != this.Count && (0 == t.Count || this.minItem.Value > t.maxItem.Value)
      }
      GreaterThanOrEquals(t) {
          return 0 != this.Count && (0 == t.Count || this.minItem.Value >= t.minItem.Value && this.maxItem.Value >= t.maxItem.Value)
      }
      LessThan(t) {
          return 0 != t.Count && (0 == this.Count || this.maxItem.Value < t.minItem.Value)
      }
      LessThanOrEquals(t) {
          return 0 != t.Count && (0 == this.Count || this.maxItem.Value <= t.maxItem.Value && this.minItem.Value <= t.minItem.Value)
      }
      MaxAsList() {
          return this.Count > 0 ? new g(this.maxItem) : new g
      }
      MinAsList() {
          return this.Count > 0 ? new g(this.minItem) : new g
      }
      ListWithSubRange(t, e) {
          if (0 == this.Count) return new g;
          let n = this.orderedItems,
              i = 0,
              a = Number.MAX_SAFE_INTEGER;
          Number.isInteger(t) ? i = t : t instanceof g && t.Count > 0 && (i = t.minItem.Value), Number.isInteger(e) ? a = e : t instanceof g && t.Count > 0 && (a = e.maxItem.Value);
          let r = new g;
          r.SetInitialOriginNames(this.originNames);
          for (let t of n) t.Value >= i && t.Value <= a && r.Add(t.Key, t.Value);
          return r
      }
      Equals(t) {
          if (t instanceof g == !1) return !1;
          if (t.Count != this.Count) return !1;
          for (let [e, n] of this)
              if (!t.has(e)) return !1;
          return !0
      }
      get orderedItems() {
          let t = new Array;
          for (let [e, n] of this) {
              let i = f.fromSerializedKey(e);
              t.push({
                  Key: i,
                  Value: n
              })
          }
          return t.sort((t, e) => null === t.Key.originName ? d("x.Key.originName") : null === e.Key.originName ? d("y.Key.originName") : t.Value == e.Value ? t.Key.originName.localeCompare(e.Key.originName) : t.Value < e.Value ? -1 : t.Value > e.Value ? 1 : 0), t
      }
      toString() {
          let t = this.orderedItems,
              e = new m;
          for (let n = 0; n < t.length; n++) {
              n > 0 && e.Append(", ");
              let i = t[n].Key;
              if (null === i.itemName) return d("item.itemName");
              e.Append(i.itemName)
          }
          return e.toString()
      }
      valueOf() {
          return NaN
      }
  }
  class C extends Error {
      constructor(t) {
          super(t), this.useEndLineNumber = !1, this.message = t, this.name = "StoryException"
      }
  }

  function v(t, e, n) {
      if (null === t) return {
          result: n,
          exists: !1
      };
      let i = t.get(e);
      return i ? {
          result: i,
          exists: !0
      } : {
          result: n,
          exists: !1
      }
  }
  class S extends p {
      static Create(t) {
          if ("boolean" == typeof t) {
              t = !!t ? 1 : 0
          }
          return Number.isInteger(Number(t)) ? new T(Number(t)) : isNaN(t) ? "string" == typeof t ? new _(String(t)) : t instanceof e ? new w(s(t, e)) : t instanceof g ? new x(s(t, g)) : null : new b(Number(t))
      }
      Copy() {
          return s(S.Create(this), p)
      }
      BadCastException(t) {
          return new C("Can't cast " + this.valueObject + " from " + this.valueType + " to " + t)
      }
  }
  class y extends S {
      constructor(t) {
          super(), this.value = t
      }
      get valueObject() {
          return this.value
      }
      toString() {
          return null === this.value ? d("Value.value") : this.value.toString()
      }
  }
  class T extends y {
      constructor(t) {
          super(t || 0)
      }
      get isTruthy() {
          return 0 != this.value
      }
      get valueType() {
          return i.Int
      }
      Cast(t) {
          if (null === this.value) return d("Value.value");
          if (t == this.valueType) return this;
          if (t == i.Float) return new b(this.value);
          if (t == i.String) return new _("" + this.value);
          throw this.BadCastException(t)
      }
  }
  class b extends y {
      constructor(t) {
          super(t || 0)
      }
      get isTruthy() {
          return 0 != this.value
      }
      get valueType() {
          return i.Float
      }
      Cast(t) {
          if (null === this.value) return d("Value.value");
          if (t == this.valueType) return this;
          if (t == i.Int) return new T(this.value);
          if (t == i.String) return new _("" + this.value);
          throw this.BadCastException(t)
      }
  }
  class _ extends y {
      constructor(t) {
          if (super(t || ""), this._isNewline = "\n" == this.value, this._isInlineWhitespace = !0, null === this.value) return d("Value.value");
          this.value.length > 0 && this.value.split("").every(t => " " == t || "\t" == t || (this._isInlineWhitespace = !1, !1))
      }
      get valueType() {
          return i.String
      }
      get isTruthy() {
          return null === this.value ? d("Value.value") : this.value.length > 0
      }
      get isNewline() {
          return this._isNewline
      }
      get isInlineWhitespace() {
          return this._isInlineWhitespace
      }
      get isNonWhitespace() {
          return !this.isNewline && !this.isInlineWhitespace
      }
      Cast(t) {
          if (t == this.valueType) return this;
          if (t == i.Int) {
              let e = function(t, e = 0) {
                  let n = parseInt(t);
                  return Number.isNaN(n) ? {
                      result: e,
                      exists: !1
                  } : {
                      result: n,
                      exists: !0
                  }
              }(this.value);
              if (e.exists) return new T(e.result);
              throw this.BadCastException(t)
          }
          if (t == i.Float) {
              let e = function(t, e = 0) {
                  let n = parseFloat(t);
                  return Number.isNaN(n) ? {
                      result: e,
                      exists: !1
                  } : {
                      result: n,
                      exists: !0
                  }
              }(this.value);
              if (e.exists) return new b(e.result);
              throw this.BadCastException(t)
          }
          throw this.BadCastException(t)
      }
  }
  class w extends y {
      constructor(t) {
          super(t)
      }
      get valueType() {
          return i.DivertTarget
      }
      get targetPath() {
          return null === this.value ? d("Value.value") : this.value
      }
      set targetPath(t) {
          this.value = t
      }
      get isTruthy() {
          throw new Error("Shouldn't be checking the truthiness of a divert target")
      }
      Cast(t) {
          if (t == this.valueType) return this;
          throw this.BadCastException(t)
      }
      toString() {
          return "DivertTargetValue(" + this.targetPath + ")"
      }
  }
  class E extends y {
      constructor(t, e = -1) {
          super(t), this._contextIndex = e
      }
      get contextIndex() {
          return this._contextIndex
      }
      set contextIndex(t) {
          this._contextIndex = t
      }
      get variableName() {
          return null === this.value ? d("Value.value") : this.value
      }
      set variableName(t) {
          this.value = t
      }
      get valueType() {
          return i.VariablePointer
      }
      get isTruthy() {
          throw new Error("Shouldn't be checking the truthiness of a variable pointer")
      }
      Cast(t) {
          if (t == this.valueType) return this;
          throw this.BadCastException(t)
      }
      toString() {
          return "VariablePointerValue(" + this.variableName + ")"
      }
      Copy() {
          return new E(this.variableName, this.contextIndex)
      }
  }
  class x extends y {
      get isTruthy() {
          return null === this.value ? d("this.value") : this.value.Count > 0
      }
      get valueType() {
          return i.List
      }
      Cast(t) {
          if (null === this.value) return d("Value.value");
          if (t == i.Int) {
              let t = this.value.maxItem;
              return t.Key.isNull ? new T(0) : new T(t.Value)
          }
          if (t == i.Float) {
              let t = this.value.maxItem;
              return t.Key.isNull ? new b(0) : new b(t.Value)
          }
          if (t == i.String) {
              let t = this.value.maxItem;
              return t.Key.isNull ? new _("") : new _(t.Key.toString())
          }
          if (t == this.valueType) return this;
          throw this.BadCastException(t)
      }
      constructor(t, e) {
          super(null), t || e ? t instanceof g ? this.value = new g(t) : t instanceof f && "number" == typeof e && (this.value = new g({
              Key: t,
              Value: e
          })) : this.value = new g
      }
      static RetainListOriginsForAssignment(t, e) {
          let n = r(t, x),
              i = r(e, x);
          return i && null === i.value ? d("newList.value") : n && null === n.value ? d("oldList.value") : void(n && i && 0 == i.value.Count && i.value.SetInitialOriginNames(n.value.originNames))
      }
  }! function(t) {
      t[t.Int = 0] = "Int", t[t.Float = 1] = "Float", t[t.List = 2] = "List", t[t.String = 3] = "String", t[t.DivertTarget = 4] = "DivertTarget", t[t.VariablePointer = 5] = "VariablePointer"
  }(i || (i = {}));
  class N {
      constructor() {
          this.obj = null, this.approximate = !1
      }
      get correctObj() {
          return this.approximate ? null : this.obj
      }
      get container() {
          return this.obj instanceof O ? this.obj : null
      }
      copy() {
          let t = new N;
          return t.obj = this.obj, t.approximate = this.approximate, t
      }
  }
  class O extends p {
      constructor() {
          super(...arguments), this.name = "", this._content = [], this.namedContent = new Map, this.visitsShouldBeCounted = !1, this.turnIndexShouldBeCounted = !1, this.countingAtStartOnly = !1, this._pathToFirstLeafContent = null
      }
      get hasValidName() {
          return null != this.name && this.name.length > 0
      }
      get content() {
          return this._content
      }
      set content(t) {
          this.AddContent(t)
      }
      get namedOnlyContent() {
          let t = new Map;
          for (let [e, n] of this.namedContent) {
              let i = s(n, p);
              t.set(e, i)
          }
          for (let e of this.content) {
              let n = o(e);
              null != n && n.hasValidName && t.delete(n.name)
          }
          return 0 == t.size && (t = null), t
      }
      set namedOnlyContent(t) {
          let e = this.namedOnlyContent;
          if (null != e)
              for (let [t, n] of e) this.namedContent.delete(t);
          if (null != t)
              for (let [e, n] of t) {
                  let t = o(n);
                  null != t && this.AddToNamedContentOnly(t)
              }
      }
      get countFlags() {
          let t = 0;
          return this.visitsShouldBeCounted && (t |= O.CountFlags.Visits), this.turnIndexShouldBeCounted && (t |= O.CountFlags.Turns), this.countingAtStartOnly && (t |= O.CountFlags.CountStartOnly), t == O.CountFlags.CountStartOnly && (t = 0), t
      }
      set countFlags(t) {
          let e = t;
          (e & O.CountFlags.Visits) > 0 && (this.visitsShouldBeCounted = !0), (e & O.CountFlags.Turns) > 0 && (this.turnIndexShouldBeCounted = !0), (e & O.CountFlags.CountStartOnly) > 0 && (this.countingAtStartOnly = !0)
      }
      get pathToFirstLeafContent() {
          return null == this._pathToFirstLeafContent && (this._pathToFirstLeafContent = this.path.PathByAppendingPath(this.internalPathToFirstLeafContent)), this._pathToFirstLeafContent
      }
      get internalPathToFirstLeafContent() {
          let t = [],
              n = this;
          for (; n instanceof O;) n.content.length > 0 && (t.push(new e.Component(0)), n = n.content[0]);
          return new e(t)
      }
      AddContent(t) {
          if (Array.isArray(t)) {
              let e = t;
              for (let t of e) this.AddContent(t)
          } else {
              let e = t;
              if (this._content.push(e), e.parent) throw new Error("content is already in " + e.parent);
              e.parent = this, this.TryAddNamedContent(e)
          }
      }
      TryAddNamedContent(t) {
          let e = o(t);
          null != e && e.hasValidName && this.AddToNamedContentOnly(e)
      }
      AddToNamedContentOnly(t) {
          n.AssertType(t, p, "Can only add Runtime.Objects to a Runtime.Container"), s(t, p).parent = this, this.namedContent.set(t.name, t)
      }
      ContentAtPath(t, e = 0, n = -1) {
          -1 == n && (n = t.length);
          let i = new N;
          i.approximate = !1;
          let a = this,
              s = this;
          for (let l = e; l < n; ++l) {
              let e = t.GetComponent(l);
              if (null == a) {
                  i.approximate = !0;
                  break
              }
              let n = a.ContentWithPathComponent(e);
              if (null == n) {
                  i.approximate = !0;
                  break
              }
              s = n, a = r(n, O)
          }
          return i.obj = s, i
      }
      InsertContent(t, e) {
          if (this.content[e] = t, t.parent) throw new Error("content is already in " + t.parent);
          t.parent = this, this.TryAddNamedContent(t)
      }
      AddContentsOfContainer(t) {
          this.content = this.content.concat(t.content);
          for (let e of t.content) e.parent = this, this.TryAddNamedContent(e)
      }
      ContentWithPathComponent(t) {
          if (t.isIndex) return t.index >= 0 && t.index < this.content.length ? this.content[t.index] : null;
          if (t.isParent) return this.parent; {
              if (null === t.name) return d("component.name");
              let e = v(this.namedContent, t.name, null);
              return e.exists ? s(e.result, p) : null
          }
      }
      BuildStringOfHierarchy() {
          let t;
          if (0 == arguments.length) return t = new m, this.BuildStringOfHierarchy(t, 0, null), t.toString();
          t = arguments[0];
          let e = arguments[1],
              i = arguments[2];

          function a() {
              for (let n = 0; n < 4 * e; ++n) t.Append(" ")
          }
          a(), t.Append("["), this.hasValidName && t.AppendFormat(" ({0})", this.name), this == i && t.Append("  <---"), t.AppendLine(), e++;
          for (let n = 0; n < this.content.length; ++n) {
              let r = this.content[n];
              if (r instanceof O) {
                  r.BuildStringOfHierarchy(t, e, i)
              } else a(), r instanceof _ ? (t.Append('"'), t.Append(r.toString().replace("\n", "\\n")), t.Append('"')) : t.Append(r.toString());
              n != this.content.length - 1 && t.Append(","), r instanceof O || r != i || t.Append("  <---"), t.AppendLine()
          }
          let r = new Map;
          for (let [t, e] of this.namedContent) this.content.indexOf(s(e, p)) >= 0 || r.set(t, e);
          if (r.size > 0) {
              a(), t.AppendLine("-- named: --");
              for (let [a, s] of r) {
                  n.AssertType(s, O, "Can only print out named Containers"), s.BuildStringOfHierarchy(t, e, i), t.AppendLine()
              }
          }
          e--, a(), t.Append("]")
      }
  }! function(t) {
      let e;
      ! function(t) {
          t[t.Visits = 1] = "Visits", t[t.Turns = 2] = "Turns", t[t.CountStartOnly = 4] = "CountStartOnly"
      }(e = t.CountFlags || (t.CountFlags = {}))
  }(O || (O = {}));
  class P extends p {
      toString() {
          return "Glue"
      }
  }
  class A extends p {
      get commandType() {
          return this._commandType
      }
      constructor(t = A.CommandType.NotSet) {
          super(), this._commandType = t
      }
      Copy() {
          return new A(this.commandType)
      }
      static EvalStart() {
          return new A(A.CommandType.EvalStart)
      }
      static EvalOutput() {
          return new A(A.CommandType.EvalOutput)
      }
      static EvalEnd() {
          return new A(A.CommandType.EvalEnd)
      }
      static Duplicate() {
          return new A(A.CommandType.Duplicate)
      }
      static PopEvaluatedValue() {
          return new A(A.CommandType.PopEvaluatedValue)
      }
      static PopFunction() {
          return new A(A.CommandType.PopFunction)
      }
      static PopTunnel() {
          return new A(A.CommandType.PopTunnel)
      }
      static BeginString() {
          return new A(A.CommandType.BeginString)
      }
      static EndString() {
          return new A(A.CommandType.EndString)
      }
      static NoOp() {
          return new A(A.CommandType.NoOp)
      }
      static ChoiceCount() {
          return new A(A.CommandType.ChoiceCount)
      }
      static Turns() {
          return new A(A.CommandType.Turns)
      }
      static TurnsSince() {
          return new A(A.CommandType.TurnsSince)
      }
      static ReadCount() {
          return new A(A.CommandType.ReadCount)
      }
      static Random() {
          return new A(A.CommandType.Random)
      }
      static SeedRandom() {
          return new A(A.CommandType.SeedRandom)
      }
      static VisitIndex() {
          return new A(A.CommandType.VisitIndex)
      }
      static SequenceShuffleIndex() {
          return new A(A.CommandType.SequenceShuffleIndex)
      }
      static StartThread() {
          return new A(A.CommandType.StartThread)
      }
      static Done() {
          return new A(A.CommandType.Done)
      }
      static End() {
          return new A(A.CommandType.End)
      }
      static ListFromInt() {
          return new A(A.CommandType.ListFromInt)
      }
      static ListRange() {
          return new A(A.CommandType.ListRange)
      }
      static ListRandom() {
          return new A(A.CommandType.ListRandom)
      }
      toString() {
          return this.commandType.toString()
      }
  }! function(t) {
      let e;
      ! function(t) {
          t[t.NotSet = -1] = "NotSet", t[t.EvalStart = 0] = "EvalStart", t[t.EvalOutput = 1] = "EvalOutput", t[t.EvalEnd = 2] = "EvalEnd", t[t.Duplicate = 3] = "Duplicate", t[t.PopEvaluatedValue = 4] = "PopEvaluatedValue", t[t.PopFunction = 5] = "PopFunction", t[t.PopTunnel = 6] = "PopTunnel", t[t.BeginString = 7] = "BeginString", t[t.EndString = 8] = "EndString", t[t.NoOp = 9] = "NoOp", t[t.ChoiceCount = 10] = "ChoiceCount", t[t.Turns = 11] = "Turns", t[t.TurnsSince = 12] = "TurnsSince", t[t.Random = 13] = "Random", t[t.SeedRandom = 14] = "SeedRandom", t[t.VisitIndex = 15] = "VisitIndex", t[t.SequenceShuffleIndex = 16] = "SequenceShuffleIndex", t[t.StartThread = 17] = "StartThread", t[t.Done = 18] = "Done", t[t.End = 19] = "End", t[t.ListFromInt = 20] = "ListFromInt", t[t.ListRange = 21] = "ListRange", t[t.ListRandom = 22] = "ListRandom", t[t.ReadCount = 23] = "ReadCount", t[t.TOTAL_VALUES = 24] = "TOTAL_VALUES"
      }(e = t.CommandType || (t.CommandType = {}))
  }(A || (A = {})),
  function(t) {
      t[t.Tunnel = 0] = "Tunnel", t[t.Function = 1] = "Function", t[t.FunctionEvaluationFromGame = 2] = "FunctionEvaluationFromGame"
  }(a || (a = {}));
  class k {
      constructor() {
          this.container = null, this.index = -1, 2 === arguments.length && (this.container = arguments[0], this.index = arguments[1])
      }
      Resolve() {
          return this.index < 0 ? this.container : null == this.container ? null : 0 == this.container.content.length ? this.container : this.index >= this.container.content.length ? null : this.container.content[this.index]
      }
      get isNull() {
          return null == this.container
      }
      get path() {
          return this.isNull ? null : this.index >= 0 ? this.container.path.PathByAppendingComponent(new e.Component(this.index)) : this.container.path
      }
      toString() {
          return this.container ? "Ink Pointer -> " + this.container.path.toString() + " -- index " + this.index : "Ink Pointer (null)"
      }
      copy() {
          return new k(this.container, this.index)
      }
      static StartOf(t) {
          return new k(t, 0)
      }
      static get Null() {
          return new k(null, -1)
      }
  }
  class I extends p {
      constructor(t) {
          super(), this._targetPath = null, this._targetPointer = k.Null, this.variableDivertName = null, this.pushesToStack = !1, this.stackPushType = 0, this.isExternal = !1, this.externalArgs = 0, this.isConditional = !1, this.pushesToStack = !1, void 0 !== t && (this.pushesToStack = !0, this.stackPushType = t)
      }
      get targetPath() {
          if (null != this._targetPath && this._targetPath.isRelative) {
              let t = this.targetPointer.Resolve();
              t && (this._targetPath = t.path)
          }
          return this._targetPath
      }
      set targetPath(t) {
          this._targetPath = t, this._targetPointer = k.Null
      }
      get targetPointer() {
          if (this._targetPointer.isNull) {
              let t = this.ResolvePath(this._targetPath).obj;
              if (null === this._targetPath) return d("this._targetPath");
              if (null === this._targetPath.lastComponent) return d("this._targetPath.lastComponent");
              if (this._targetPath.lastComponent.isIndex) {
                  if (null === t) return d("targetObj");
                  this._targetPointer.container = t.parent instanceof O ? t.parent : null, this._targetPointer.index = this._targetPath.lastComponent.index
              } else this._targetPointer = k.StartOf(t instanceof O ? t : null)
          }
          return this._targetPointer.copy()
      }
      get targetPathString() {
          return null == this.targetPath ? null : this.CompactPathString(this.targetPath)
      }
      set targetPathString(t) {
          this.targetPath = null == t ? null : new e(t)
      }
      get hasVariableTarget() {
          return null != this.variableDivertName
      }
      Equals(t) {
          let e = t;
          return e instanceof I && this.hasVariableTarget == e.hasVariableTarget && (this.hasVariableTarget ? this.variableDivertName == e.variableDivertName : null === this.targetPath ? d("this.targetPath") : this.targetPath.Equals(e.targetPath))
      }
      toString() {
          if (this.hasVariableTarget) return "Divert(variable: " + this.variableDivertName + ")";
          if (null == this.targetPath) return "Divert(null)"; {
              let t = new m,
                  e = this.targetPath.toString();
              return t.Append("Divert"), this.isConditional && t.Append("?"), this.pushesToStack && (this.stackPushType == a.Function ? t.Append(" function") : t.Append(" tunnel")), t.Append(" -> "), t.Append(this.targetPathString), t.Append(" ("), t.Append(e), t.Append(")"), t.toString()
          }
      }
  }
  class F extends p {
      constructor(t = !0) {
          super(), this._pathOnChoice = null, this.hasCondition = !1, this.hasStartContent = !1, this.hasChoiceOnlyContent = !1, this.isInvisibleDefault = !1, this.onceOnly = !0, this.onceOnly = t
      }
      get pathOnChoice() {
          if (null != this._pathOnChoice && this._pathOnChoice.isRelative) {
              let t = this.choiceTarget;
              t && (this._pathOnChoice = t.path)
          }
          return this._pathOnChoice
      }
      set pathOnChoice(t) {
          this._pathOnChoice = t
      }
      get choiceTarget() {
          return null === this._pathOnChoice ? d("ChoicePoint._pathOnChoice") : this.ResolvePath(this._pathOnChoice).container
      }
      get pathStringOnChoice() {
          return null === this.pathOnChoice ? d("ChoicePoint.pathOnChoice") : this.CompactPathString(this.pathOnChoice)
      }
      set pathStringOnChoice(t) {
          this.pathOnChoice = new e(t)
      }
      get flags() {
          let t = 0;
          return this.hasCondition && (t |= 1), this.hasStartContent && (t |= 2), this.hasChoiceOnlyContent && (t |= 4), this.isInvisibleDefault && (t |= 8), this.onceOnly && (t |= 16), t
      }
      set flags(t) {
          this.hasCondition = (1 & t) > 0, this.hasStartContent = (2 & t) > 0, this.hasChoiceOnlyContent = (4 & t) > 0, this.isInvisibleDefault = (8 & t) > 0, this.onceOnly = (16 & t) > 0
      }
      toString() {
          if (null === this.pathOnChoice) return d("ChoicePoint.pathOnChoice");
          return "Choice: -> " + this.pathOnChoice.toString()
      }
  }
  class V extends p {
      constructor(t = null) {
          super(), this.pathForCount = null, this.name = t
      }
      get containerForCount() {
          return null === this.pathForCount ? null : this.ResolvePath(this.pathForCount).container
      }
      get pathStringForCount() {
          return null === this.pathForCount ? null : this.CompactPathString(this.pathForCount)
      }
      set pathStringForCount(t) {
          this.pathForCount = null === t ? null : new e(t)
      }
      toString() {
          if (null != this.name) return "var(" + this.name + ")";
          return "read_count(" + this.pathStringForCount + ")"
      }
  }
  class L extends p {
      constructor(t, e) {
          super(), this.variableName = t || null, this.isNewDeclaration = !!e, this.isGlobal = !1
      }
      toString() {
          return "VarAssign to " + this.variableName
      }
  }
  class R extends p {}
  class D extends p {
      constructor() {
          if (super(), this._name = null, this._numberOfParameters = 0, this._prototype = null, this._isPrototype = !1, this._operationFuncs = null, 0 === arguments.length) D.GenerateNativeFunctionsIfNecessary();
          else if (1 === arguments.length) {
              let t = arguments[0];
              D.GenerateNativeFunctionsIfNecessary(), this.name = t
          } else if (2 === arguments.length) {
              let t = arguments[0],
                  e = arguments[1];
              this._isPrototype = !0, this.name = t, this.numberOfParameters = e
          }
      }
      static CallWithName(t) {
          return new D(t)
      }
      static CallExistsWithName(t) {
          return this.GenerateNativeFunctionsIfNecessary(), this._nativeFunctions.get(t)
      }
      get name() {
          return null === this._name ? d("NativeFunctionCall._name") : this._name
      }
      set name(t) {
          this._name = t, this._isPrototype || (null === D._nativeFunctions ? d("NativeFunctionCall._nativeFunctions") : this._prototype = D._nativeFunctions.get(this._name) || null)
      }
      get numberOfParameters() {
          return this._prototype ? this._prototype.numberOfParameters : this._numberOfParameters
      }
      set numberOfParameters(t) {
          this._numberOfParameters = t
      }
      Call(t) {
          if (this._prototype) return this._prototype.Call(t);
          if (this.numberOfParameters != t.length) throw new Error("Unexpected number of parameters");
          let e = !1;
          for (let n of t) {
              if (n instanceof R) throw new C('Attempting to perform operation on a void value. Did you forget to "return" a value from a function you called here?');
              n instanceof x && (e = !0)
          }
          if (2 == t.length && e) return this.CallBinaryListOperation(t);
          let n = this.CoerceValuesToSingleType(t),
              a = n[0].valueType;
          return a == i.Int ? this.CallType(n) : a == i.Float ? this.CallType(n) : a == i.String ? this.CallType(n) : a == i.DivertTarget ? this.CallType(n) : a == i.List ? this.CallType(n) : null
      }
      CallType(t) {
          let e = s(t[0], y),
              n = e.valueType,
              i = e,
              a = t.length;
          if (2 == a || 1 == a) {
              if (null === this._operationFuncs) return d("NativeFunctionCall._operationFuncs");
              let e = this._operationFuncs.get(n);
              if (!e) throw new C("Cannot perform operation " + this.name + " on " + n);
              if (2 == a) {
                  let n = s(t[1], y),
                      a = e;
                  if (null === i.value || null === n.value) return d("NativeFunctionCall.Call BinaryOp values");
                  let r = a(i.value, n.value);
                  return y.Create(r)
              } {
                  let t = e;
                  if (null === i.value) return d("NativeFunctionCall.Call UnaryOp value");
                  let n = t(i.value);
                  return y.Create(n)
              }
          }
          throw new Error("Unexpected number of parameters to NativeFunctionCall: " + t.length)
      }
      CallBinaryListOperation(t) {
          if (("+" == this.name || "-" == this.name) && t[0] instanceof x && t[1] instanceof T) return this.CallListIncrementOperation(t);
          let e = s(t[0], y),
              n = s(t[1], y);
          if (!("&&" != this.name && "||" != this.name || e.valueType == i.List && n.valueType == i.List)) {
              if (null === this._operationFuncs) return d("NativeFunctionCall._operationFuncs");
              let t = this._operationFuncs.get(i.Int);
              if (null === t) return d("NativeFunctionCall.CallBinaryListOperation op");
              let a = t(e.isTruthy ? 1 : 0, n.isTruthy ? 1 : 0);
              return new T(a)
          }
          if (e.valueType == i.List && n.valueType == i.List) return this.CallType([e, n]);
          throw new C("Can not call use " + this.name + " operation on " + e.valueType + " and " + n.valueType)
      }
      CallListIncrementOperation(t) {
          let e = s(t[0], x),
              n = s(t[1], T),
              a = new g;
          if (null === e.value) return d("NativeFunctionCall.CallListIncrementOperation listVal.value");
          for (let [t, r] of e.value) {
              let s = f.fromSerializedKey(t);
              if (null === this._operationFuncs) return d("NativeFunctionCall._operationFuncs");
              let l = this._operationFuncs.get(i.Int);
              if (null === n.value) return d("NativeFunctionCall.CallListIncrementOperation intVal.value");
              let o = l(r, n.value),
                  u = null;
              if (null === e.value.origins) return d("NativeFunctionCall.CallListIncrementOperation listVal.value.origins");
              for (let t of e.value.origins)
                  if (t.name == s.originName) {
                      u = t;
                      break
                  } if (null != u) {
                  let t = u.TryGetItemWithValue(o, f.Null);
                  t.exists && a.Add(t.result, o)
              }
          }
          return new x(a)
      }
      CoerceValuesToSingleType(t) {
          let e = i.Int,
              n = null;
          for (let a of t) {
              let t = s(a, y);
              t.valueType > e && (e = t.valueType), t.valueType == i.List && (n = r(t, x))
          }
          let a = [];
          if (i[e] == i[i.List])
              for (let e of t) {
                  let t = s(e, y);
                  if (t.valueType == i.List) a.push(t);
                  else {
                      if (t.valueType != i.Int) throw new C("Cannot mix Lists and " + t.valueType + " values in this operation"); {
                          let e = parseInt(t.valueObject);
                          if (null === (n = s(n, x)).value) return d("NativeFunctionCall.CoerceValuesToSingleType specialCaseList.value");
                          let i = n.value.originOfMaxItem;
                          if (null === i) return d("NativeFunctionCall.CoerceValuesToSingleType list");
                          let r = i.TryGetItemWithValue(e, f.Null);
                          if (!r.exists) throw new C("Could not find List item with the value " + e + " in " + i.name); {
                              let t = new x(r.result, e);
                              a.push(t)
                          }
                      }
                  }
              } else
                  for (let n of t) {
                      let t = s(n, y).Cast(e);
                      a.push(t)
                  }
          return a
      }
      static Identity(t) {
          return t
      }
      static GenerateNativeFunctionsIfNecessary() {
          if (null == this._nativeFunctions) {
              this._nativeFunctions = new Map, this.AddIntBinaryOp(this.Add, (t, e) => t + e), this.AddIntBinaryOp(this.Subtract, (t, e) => t - e), this.AddIntBinaryOp(this.Multiply, (t, e) => t * e), this.AddIntBinaryOp(this.Divide, (t, e) => Math.round(t / e)), this.AddIntBinaryOp(this.Mod, (t, e) => t % e), this.AddIntUnaryOp(this.Negate, t => -t), this.AddIntBinaryOp(this.Equal, (t, e) => t == e ? 1 : 0), this.AddIntBinaryOp(this.Greater, (t, e) => t > e ? 1 : 0), this.AddIntBinaryOp(this.Less, (t, e) => t < e ? 1 : 0), this.AddIntBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e ? 1 : 0), this.AddIntBinaryOp(this.LessThanOrEquals, (t, e) => t <= e ? 1 : 0), this.AddIntBinaryOp(this.NotEquals, (t, e) => t != e ? 1 : 0), this.AddIntUnaryOp(this.Not, t => 0 == t ? 1 : 0), this.AddIntBinaryOp(this.And, (t, e) => 0 != t && 0 != e ? 1 : 0), this.AddIntBinaryOp(this.Or, (t, e) => 0 != t || 0 != e ? 1 : 0), this.AddIntBinaryOp(this.Max, (t, e) => Math.max(t, e)), this.AddIntBinaryOp(this.Min, (t, e) => Math.min(t, e)), this.AddIntBinaryOp(this.Pow, (t, e) => Math.pow(t, e)), this.AddIntUnaryOp(this.Floor, D.Identity), this.AddIntUnaryOp(this.Ceiling, D.Identity), this.AddIntUnaryOp(this.Int, D.Identity), this.AddIntUnaryOp(this.Float, t => t), this.AddFloatBinaryOp(this.Add, (t, e) => t + e), this.AddFloatBinaryOp(this.Subtract, (t, e) => t - e), this.AddFloatBinaryOp(this.Multiply, (t, e) => t * e), this.AddFloatBinaryOp(this.Divide, (t, e) => t / e), this.AddFloatBinaryOp(this.Mod, (t, e) => t % e), this.AddFloatUnaryOp(this.Negate, t => -t), this.AddFloatBinaryOp(this.Equal, (t, e) => t == e ? 1 : 0), this.AddFloatBinaryOp(this.Greater, (t, e) => t > e ? 1 : 0), this.AddFloatBinaryOp(this.Less, (t, e) => t < e ? 1 : 0), this.AddFloatBinaryOp(this.GreaterThanOrEquals, (t, e) => t >= e ? 1 : 0), this.AddFloatBinaryOp(this.LessThanOrEquals, (t, e) => t <= e ? 1 : 0), this.AddFloatBinaryOp(this.NotEquals, (t, e) => t != e ? 1 : 0), this.AddFloatUnaryOp(this.Not, t => 0 == t ? 1 : 0), this.AddFloatBinaryOp(this.And, (t, e) => 0 != t && 0 != e ? 1 : 0), this.AddFloatBinaryOp(this.Or, (t, e) => 0 != t || 0 != e ? 1 : 0), this.AddFloatBinaryOp(this.Max, (t, e) => Math.max(t, e)), this.AddFloatBinaryOp(this.Min, (t, e) => Math.min(t, e)), this.AddFloatBinaryOp(this.Pow, (t, e) => Math.pow(t, e)), this.AddFloatUnaryOp(this.Floor, t => Math.floor(t)), this.AddFloatUnaryOp(this.Ceiling, t => Math.ceil(t)), this.AddFloatUnaryOp(this.Int, t => Math.floor(t)), this.AddFloatUnaryOp(this.Float, D.Identity), this.AddStringBinaryOp(this.Add, (t, e) => t + e), this.AddStringBinaryOp(this.Equal, (t, e) => t === e ? 1 : 0), this.AddStringBinaryOp(this.NotEquals, (t, e) => t !== e ? 1 : 0), this.AddStringBinaryOp(this.Has, (t, e) => t.includes(e) ? 1 : 0), this.AddStringBinaryOp(this.Hasnt, (t, e) => t.includes(e) ? 0 : 1), this.AddListBinaryOp(this.Add, (t, e) => t.Union(e)), this.AddListBinaryOp(this.Subtract, (t, e) => t.Without(e)), this.AddListBinaryOp(this.Has, (t, e) => t.Contains(e) ? 1 : 0), this.AddListBinaryOp(this.Hasnt, (t, e) => t.Contains(e) ? 0 : 1), this.AddListBinaryOp(this.Intersect, (t, e) => t.Intersect(e)), this.AddListBinaryOp(this.Equal, (t, e) => t.Equals(e) ? 1 : 0), this.AddListBinaryOp(this.Greater, (t, e) => t.GreaterThan(e) ? 1 : 0), this.AddListBinaryOp(this.Less, (t, e) => t.LessThan(e) ? 1 : 0), this.AddListBinaryOp(this.GreaterThanOrEquals, (t, e) => t.GreaterThanOrEquals(e) ? 1 : 0), this.AddListBinaryOp(this.LessThanOrEquals, (t, e) => t.LessThanOrEquals(e) ? 1 : 0), this.AddListBinaryOp(this.NotEquals, (t, e) => t.Equals(e) ? 0 : 1), this.AddListBinaryOp(this.And, (t, e) => t.Count > 0 && e.Count > 0 ? 1 : 0), this.AddListBinaryOp(this.Or, (t, e) => t.Count > 0 || e.Count > 0 ? 1 : 0), this.AddListUnaryOp(this.Not, t => 0 == t.Count ? 1 : 0), this.AddListUnaryOp(this.Invert, t => t.inverse), this.AddListUnaryOp(this.All, t => t.all), this.AddListUnaryOp(this.ListMin, t => t.MinAsList()), this.AddListUnaryOp(this.ListMax, t => t.MaxAsList()), this.AddListUnaryOp(this.Count, t => t.Count), this.AddListUnaryOp(this.ValueOfList, t => t.maxItem.Value);
              let t = (t, e) => t.Equals(e) ? 1 : 0,
                  e = (t, e) => t.Equals(e) ? 0 : 1;
              this.AddOpToNativeFunc(this.Equal, 2, i.DivertTarget, t), this.AddOpToNativeFunc(this.NotEquals, 2, i.DivertTarget, e)
          }
      }
      AddOpFuncForType(t, e) {
          null == this._operationFuncs && (this._operationFuncs = new Map), this._operationFuncs.set(t, e)
      }
      static AddOpToNativeFunc(t, e, n, i) {
          if (null === this._nativeFunctions) return d("NativeFunctionCall._nativeFunctions");
          let a = this._nativeFunctions.get(t);
          a || (a = new D(t, e), this._nativeFunctions.set(t, a)), a.AddOpFuncForType(n, i)
      }
      static AddIntBinaryOp(t, e) {
          this.AddOpToNativeFunc(t, 2, i.Int, e)
      }
      static AddIntUnaryOp(t, e) {
          this.AddOpToNativeFunc(t, 1, i.Int, e)
      }
      static AddFloatBinaryOp(t, e) {
          this.AddOpToNativeFunc(t, 2, i.Float, e)
      }
      static AddFloatUnaryOp(t, e) {
          this.AddOpToNativeFunc(t, 1, i.Float, e)
      }
      static AddStringBinaryOp(t, e) {
          this.AddOpToNativeFunc(t, 2, i.String, e)
      }
      static AddListBinaryOp(t, e) {
          this.AddOpToNativeFunc(t, 2, i.List, e)
      }
      static AddListUnaryOp(t, e) {
          this.AddOpToNativeFunc(t, 1, i.List, e)
      }
      toString() {
          return 'Native "' + this.name + '"'
      }
  }
  D.Add = "+", D.Subtract = "-", D.Divide = "/", D.Multiply = "*", D.Mod = "%", D.Negate = "_", D.Equal = "==", D.Greater = ">", D.Less = "<", D.GreaterThanOrEquals = ">=", D.LessThanOrEquals = "<=", D.NotEquals = "!=", D.Not = "!", D.And = "&&", D.Or = "||", D.Min = "MIN", D.Max = "MAX", D.Pow = "POW", D.Floor = "FLOOR", D.Ceiling = "CEILING", D.Int = "INT", D.Float = "FLOAT", D.Has = "?", D.Hasnt = "!?", D.Intersect = "^", D.ListMin = "LIST_MIN", D.ListMax = "LIST_MAX", D.All = "LIST_ALL", D.Count = "LIST_COUNT", D.ValueOfList = "LIST_VALUE", D.Invert = "LIST_INVERT", D._nativeFunctions = null;
  class M extends p {
      constructor(t) {
          super(), this.text = t.toString() || ""
      }
      toString() {
          return "# " + this.text
      }
  }
  class G extends p {
      constructor() {
          super(...arguments), this.text = "", this.index = 0, this.threadAtGeneration = null, this.sourcePath = "", this.targetPath = null, this.isInvisibleDefault = !1, this.originalThreadIndex = 0
      }
      get pathStringOnChoice() {
          return null === this.targetPath ? d("Choice.targetPath") : this.targetPath.toString()
      }
      set pathStringOnChoice(t) {
          this.targetPath = new e(t)
      }
  }
  class B {
      constructor(t, e) {
          this._name = t || "", this._items = null, this._itemNameToValues = e || new Map
      }
      get name() {
          return this._name
      }
      get items() {
          if (null == this._items) {
              this._items = new Map;
              for (let [t, e] of this._itemNameToValues) {
                  let n = new f(this.name, t);
                  this._items.set(n.serialized(), e)
              }
          }
          return this._items
      }
      ValueForItem(t) {
          if (!t.itemName) return 0;
          let e = this._itemNameToValues.get(t.itemName);
          return void 0 !== e ? e : 0
      }
      ContainsItem(t) {
          return !!t.itemName && (t.originName == this.name && this._itemNameToValues.has(t.itemName))
      }
      ContainsItemWithName(t) {
          return this._itemNameToValues.has(t)
      }
      TryGetItemWithValue(t, e) {
          for (let [e, n] of this._itemNameToValues)
              if (n == t) return {
                  result: new f(this.name, e),
                  exists: !0
              };
          return {
              result: f.Null,
              exists: !1
          }
      }
      TryGetValueForItem(t, e) {
          if (!t.itemName) return {
              result: 0,
              exists: !1
          };
          let n = this._itemNameToValues.get(t.itemName);
          return n ? {
              result: n,
              exists: !0
          } : {
              result: 0,
              exists: !1
          }
      }
  }
  class W {
      constructor(t) {
          this._lists = new Map, this._allUnambiguousListValueCache = new Map;
          for (let e of t) {
              this._lists.set(e.name, e);
              for (let [t, n] of e.items) {
                  let ___z = f.fromSerializedKey(t),
                      i = new x(___z, n);
                  if (!___z.itemName) throw new Error("item.itemName is null or undefined.");
                  this._allUnambiguousListValueCache.set(___z.itemName, i), this._allUnambiguousListValueCache.set(___z.fullName, i)
              }
          }
      }
      get lists() {
          let t = [];
          for (let [e, n] of this._lists) t.push(n);
          return t
      }
      TryListGetDefinition(t, e) {
          if (null === t) return {
              result: e,
              exists: !1
          };
          let n = this._lists.get(t);
          return n ? {
              result: n,
              exists: !0
          } : {
              result: e,
              exists: !1
          }
      }
      FindSingleItemListWithName(t) {
          if (null === t) return d("name");
          let e = this._allUnambiguousListValueCache.get(t);
          return void 0 !== e ? e : null
      }
  }
  class j {
      static ListToJArray(t) {
          let e = [];
          for (let n of t) e.push(this.RuntimeObjectToJToken(n));
          return e
      }
      static JArrayToRuntimeObjList(t, e = !1) {
          let n = t.length;
          e && n--;
          let i = [];
          for (let e = 0; e < n; e++) {
              let n = t[e],
                  a = this.JTokenToRuntimeObject(n);
              if (null === a) return d("runtimeObj");
              i.push(a)
          }
          return i
      }
      static DictionaryRuntimeObjsToJObject(t) {
          let e = {};
          for (let [n, i] of t) {
              let t = r(i, p);
              null != t && (e[n] = this.RuntimeObjectToJToken(t))
          }
          return e
      }
      static JObjectToDictionaryRuntimeObjs(t) {
          let e = new Map;
          for (let n in t)
              if (t.hasOwnProperty(n)) {
                  let i = this.JTokenToRuntimeObject(t[n]);
                  if (null === i) return d("inkObject");
                  e.set(n, i)
              } return e
      }
      static JObjectToIntDictionary(t) {
          let e = new Map;
          for (let n in t) t.hasOwnProperty(n) && e.set(n, parseInt(t[n]));
          return e
      }
      static IntDictionaryToJObject(t) {
          let e = {};
          for (let [n, i] of t) e[n] = l(i);
          return e
      }
      static JTokenToRuntimeObject(t) {
          if ("number" == typeof t && !isNaN(t)) return y.Create(t);
          if ("string" == typeof t) {
              let e = t.toString(),
                  n = e[0];
              if ("^" == n) return new _(e.substring(1));
              if ("\n" == n && 1 == e.length) return new _("\n");
              if ("<>" == e) return new P;
              for (let t = 0; t < j._controlCommandNames.length; ++t) {
                  if (e == j._controlCommandNames[t]) return new A(t)
              }
              if ("L^" == e && (e = "^"), D.CallExistsWithName(e)) return D.CallWithName(e);
              if ("->->" == e) return A.PopTunnel();
              if ("~ret" == e) return A.PopFunction();
              if ("void" == e) return new R
          }
          if ("object" == typeof t && Array.isArray(t) == !1) {
              let n, i = t;
              if (i["^->"]) return n = i["^->"], new w(new e(n.toString()));
              if (i["^var"]) {
                  n = i["^var"];
                  let t = new E(n.toString());
                  return "ci" in i && (n = i.ci, t.contextIndex = parseInt(n)), t
              }
              let r = !1,
                  s = !1,
                  l = a.Function,
                  o = !1;
              if ((n = i["->"]) ? r = !0 : (n = i["f()"]) ? (r = !0, s = !0, l = a.Function) : (n = i["->t->"]) ? (r = !0, s = !0, l = a.Tunnel) : (n = i["x()"]) && (r = !0, o = !0, s = !1, l = a.Function), r) {
                  let t = new I;
                  t.pushesToStack = s, t.stackPushType = l, t.isExternal = o;
                  let e = n.toString();
                  return (n = i.var) ? t.variableDivertName = e : t.targetPathString = e, t.isConditional = !!i.c, o && (n = i.exArgs) && (t.externalArgs = parseInt(n)), t
              }
              if (n = i["*"]) {
                  let t = new F;
                  return t.pathStringOnChoice = n.toString(), (n = i.flg) && (t.flags = parseInt(n)), t
              }
              if (n = i["VAR?"]) return new V(n.toString());
              if (n = i["CNT?"]) {
                  let t = new V;
                  return t.pathStringForCount = n.toString(), t
              }
              let u = !1,
                  h = !1;
              if ((n = i["VAR="]) ? (u = !0, h = !0) : (n = i["temp="]) && (u = !0, h = !1), u) {
                  let t = n.toString(),
                      e = !i.re,
                      a = new L(t, e);
                  return a.isGlobal = h, a
              }
              if (void 0 !== i["#"]) return n = i["#"], new M(n.toString());
              if (n = i.list) {
                  let t = n,
                      e = new g;
                  if (n = i.origins) {
                      let t = n;
                      e.SetInitialOriginNames(t)
                  }
                  for (let n in t)
                      if (t.hasOwnProperty(n)) {
                          let i = t[n],
                              a = new f(n),
                              r = parseInt(i);
                          e.Add(a, r)
                      } return new x(e)
              }
              if (null != i.originalChoicePath) return this.JObjectToChoice(i)
          }
          if (Array.isArray(t)) return this.JArrayToContainer(t);
          if (null == t) return null;
          throw new Error("Failed to convert token to runtime object: " + JSON.stringify(t))
      }
      static RuntimeObjectToJToken(t) {
          let e = r(t, O);
          if (e) return this.ContainerToJArray(e);
          let n = r(t, I);
          if (n) {
              let t, e = "->";
              n.isExternal ? e = "x()" : n.pushesToStack && (n.stackPushType == a.Function ? e = "f()" : n.stackPushType == a.Tunnel && (e = "->t->")), t = n.hasVariableTarget ? n.variableDivertName : n.targetPathString;
              let i = {};
              return i[e] = t, n.hasVariableTarget && (i.var = !0), n.isConditional && (i.c = !0), n.externalArgs > 0 && (i.exArgs = n.externalArgs), i
          }
          let i = r(t, F);
          if (i) {
              let t = {};
              return t["*"] = i.pathStringOnChoice, t.flg = i.flags, t
          }
          let s = r(t, T);
          if (s) return s.value;
          let l = r(t, b);
          if (l) return l.value;
          let o = r(t, _);
          if (o) return o.isNewline ? "\n" : "^" + o.value;
          let u = r(t, x);
          if (u) return this.InkListToJObject(u);
          let h = r(t, w);
          if (h) {
              let t = {};
              return null === h.value ? d("divTargetVal.value") : (t["^->"] = h.value.componentsString, t)
          }
          let c = r(t, E);
          if (c) {
              let t = {};
              return t["^var"] = c.value, t.ci = c.contextIndex, t
          }
          if (r(t, P)) return "<>";
          let p = r(t, A);
          if (p) return j._controlCommandNames[p.commandType];
          let m = r(t, D);
          if (m) {
              let t = m.name;
              return "^" == t && (t = "L^"), t
          }
          let f = r(t, V);
          if (f) {
              let t = {},
                  e = f.pathStringForCount;
              return null != e ? t["CNT?"] = e : t["VAR?"] = f.name, t
          }
          let g = r(t, L);
          if (g) {
              let t = {};
              return t[g.isGlobal ? "VAR=" : "temp="] = g.variableName, g.isNewDeclaration || (t.re = !0), t
          }
          if (r(t, R)) return "void";
          let C = r(t, M);
          if (C) {
              let t = {};
              return t["#"] = C.text, t
          }
          let v = r(t, G);
          if (v) return this.ChoiceToJObject(v);
          throw new Error("Failed to convert runtime object to Json token: " + t)
      }
      static ContainerToJArray(t) {
          let e = this.ListToJArray(t.content),
              n = t.namedOnlyContent,
              i = t.countFlags;
          if (null != n && n.size > 0 || i > 0 || null != t.name) {
              let a;
              if (null != n) {
                  a = this.DictionaryRuntimeObjsToJObject(n);
                  for (let t in a)
                      if (a.hasOwnProperty(t)) {
                          let e = a[t];
                          if (null != e) {
                              let t = e[e.length - 1];
                              null != t && (delete t["#n"], 0 == Object.keys(t).length && (e[e.length - 1] = null))
                          }
                      }
              } else a = {};
              i > 0 && (a["#f"] = i), null != t.name && (a["#n"] = t.name), e.push(a)
          } else e.push(null);
          return e
      }
      static JArrayToContainer(t) {
          let e = new O;
          e.content = this.JArrayToRuntimeObjList(t, !0);
          let n = t[t.length - 1];
          if (null != n) {
              let t = new Map;
              for (let i in n)
                  if ("#f" == i) e.countFlags = parseInt(n[i]);
                  else if ("#n" == i) e.name = n[i].toString();
              else {
                  let e = this.JTokenToRuntimeObject(n[i]),
                      a = r(e, O);
                  a && (a.name = i), t.set(i, e)
              }
              e.namedOnlyContent = t
          }
          return e
      }
      static JObjectToChoice(t) {
          let e = new G;
          return e.text = t.text.toString(), e.index = parseInt(t.index), e.sourcePath = t.originalChoicePath.toString(), e.originalThreadIndex = parseInt(t.originalThreadIndex), e.pathStringOnChoice = t.targetPath.toString(), e
      }
      static ChoiceToJObject(t) {
          let e = {};
          return e.text = t.text, e.index = t.index, e.originalChoicePath = t.sourcePath, e.originalThreadIndex = t.originalThreadIndex, e.targetPath = t.pathStringOnChoice, e
      }
      static InkListToJObject(t) {
          let e = t.value;
          if (null === e) return d("rawList");
          let n = {},
              i = {};
          for (let [t, n] of e) {
              i[f.fromSerializedKey(t).toString()] = n
          }
          return n.list = i, 0 == e.Count && null != e.originNames && e.originNames.length > 0 && (n.origins = e.originNames), n
      }
      static ListDefinitionsToJToken(t) {
          let e = {};
          for (let n of t.lists) {
              let t = {};
              for (let [e, i] of n.items) {
                  let n = f.fromSerializedKey(e);
                  if (null === n.itemName) return d("item.itemName");
                  t[n.itemName] = i
              }
              e[n.name] = t
          }
          return e
      }
      static JTokenToListDefinitions(t) {
          let e = t,
              n = [];
          for (let t in e)
              if (e.hasOwnProperty(t)) {
                  let i = t.toString(),
                      a = e[t],
                      r = new Map;
                  for (let n in a)
                      if (e.hasOwnProperty(t)) {
                          let t = a[n];
                          r.set(n, parseInt(t))
                      } let s = new B(i, r);
                  n.push(s)
              } return new W(n)
      }
  }
  j._controlCommandNames = (() => {
      let t = [];
      t[A.CommandType.EvalStart] = "ev", t[A.CommandType.EvalOutput] = "out", t[A.CommandType.EvalEnd] = "/ev", t[A.CommandType.Duplicate] = "du", t[A.CommandType.PopEvaluatedValue] = "pop", t[A.CommandType.PopFunction] = "~ret", t[A.CommandType.PopTunnel] = "->->", t[A.CommandType.BeginString] = "str", t[A.CommandType.EndString] = "/str", t[A.CommandType.NoOp] = "nop", t[A.CommandType.ChoiceCount] = "choiceCnt", t[A.CommandType.Turns] = "turn", t[A.CommandType.TurnsSince] = "turns", t[A.CommandType.ReadCount] = "readc", t[A.CommandType.Random] = "rnd", t[A.CommandType.SeedRandom] = "srnd", t[A.CommandType.VisitIndex] = "visit", t[A.CommandType.SequenceShuffleIndex] = "seq", t[A.CommandType.StartThread] = "thread", t[A.CommandType.Done] = "done", t[A.CommandType.End] = "end", t[A.CommandType.ListFromInt] = "listInt", t[A.CommandType.ListRange] = "range", t[A.CommandType.ListRandom] = "lrnd";
      for (let e = 0; e < A.CommandType.TOTAL_VALUES; ++e)
          if (null == t[e]) throw new Error("Control command not accounted for in serialisation");
      return t
  })();
  class J {
      constructor() {
          if (this._threadCounter = 0, arguments[0] instanceof O || null === arguments[0]) {
              let t = arguments[0];
              this._threads = [], this._threads.push(new J.Thread), this._threads[0].callstack.push(new J.Element(a.Tunnel, k.StartOf(t)))
          } else {
              let t = arguments[0];
              this._threads = [];
              for (let e of t._threads) this._threads.push(e.Copy())
          }
      }
      get elements() {
          return this.callStack
      }
      get depth() {
          return this.elements.length
      }
      get currentElement() {
          let t = this._threads[this._threads.length - 1].callstack;
          return t[t.length - 1]
      }
      get currentElementIndex() {
          return this.callStack.length - 1
      }
      get currentThread() {
          return this._threads[this._threads.length - 1]
      }
      set currentThread(t) {
          n.Assert(1 == this._threads.length, "Shouldn't be directly setting the current thread when we have a stack of them"), this._threads.length = 0, this._threads.push(t)
      }
      get canPop() {
          return this.callStack.length > 1
      }
      SetJsonToken(t, e) {
          this._threads.length = 0;
          let n = t.threads;
          for (let t of n) {
              let n = t,
                  i = new J.Thread(n, e);
              this._threads.push(i)
          }
          this._threadCounter = parseInt(t.threadCounter)
      }
      GetJsonToken() {
          let t = {},
              e = [];
          for (let t of this._threads) e.push(t.jsonToken);
          return t.threads = e, t.threadCounter = this._threadCounter, t
      }
      PushThread() {
          let t = this.currentThread.Copy();
          this._threadCounter++, t.threadIndex = this._threadCounter, this._threads.push(t)
      }
      PopThread() {
          if (!this.canPopThread) throw new Error("Can't pop thread");
          this._threads.splice(this._threads.indexOf(this.currentThread), 1)
      }
      get canPopThread() {
          return this._threads.length > 1 && !this.elementIsEvaluateFromGame
      }
      get elementIsEvaluateFromGame() {
          return this.currentElement.type == a.FunctionEvaluationFromGame
      }
      Push(t, e = 0, n = 0) {
          let i = new J.Element(t, this.currentElement.currentPointer, !1);
          i.evaluationStackHeightWhenPushed = e, i.functionStartInOutputStream = n, this.callStack.push(i)
      }
      CanPop(t = null) {
          return !!this.canPop && (null == t || this.currentElement.type == t)
      }
      Pop(t = null) {
          if (!this.CanPop(t)) throw new Error("Mismatched push/pop in Callstack");
          this.callStack.pop()
      }
      GetTemporaryVariableWithName(t, e = -1) {
          -1 == e && (e = this.currentElementIndex + 1);
          let n = v(this.callStack[e - 1].temporaryVariables, t, null);
          return n.exists ? n.result : null
      }
      SetTemporaryVariable(t, e, n, i = -1) {
          -1 == i && (i = this.currentElementIndex + 1);
          let a = this.callStack[i - 1];
          if (!n && !a.temporaryVariables.get(t)) throw new C("Could not find temporary variable to set: " + t);
          let r = v(a.temporaryVariables, t, null);
          r.exists && x.RetainListOriginsForAssignment(r.result, e), a.temporaryVariables.set(t, e)
      }
      ContextForVariableNamed(t) {
          return this.currentElement.temporaryVariables.get(t) ? this.currentElementIndex + 1 : 0
      }
      ThreadWithIndex(t) {
          return this._threads.filter(e => {
              if (e.threadIndex == t) return e
          })[0]
      }
      get callStack() {
          return this.currentThread.callstack
      }
      get callStackTrace() {
          let t = new m;
          for (let e = 0; e < this._threads.length; e++) {
              let n = this._threads[e],
                  i = e == this._threads.length - 1;
              t.AppendFormat("=== THREAD {0}/{1} {2}===\n", e + 1, this._threads.length, i ? "(current) " : "");
              for (let e = 0; e < n.callstack.length; e++) {
                  n.callstack[e].type == a.Function ? t.Append("  [FUNCTION] ") : t.Append("  [TUNNEL] ");
                  let i = n.callstack[e].currentPointer;
                  if (!i.isNull) {
                      if (t.Append("<SOMEWHERE IN "), null === i.container) return d("pointer.container");
                      t.Append(i.container.path.toString()), t.AppendLine(">")
                  }
              }
          }
          return t.toString()
      }
  }! function(t) {
      class n {
          constructor(t, e, n = !1) {
              this.evaluationStackHeightWhenPushed = 0, this.functionStartInOutputStream = 0, this.currentPointer = e.copy(), this.inExpressionEvaluation = n, this.temporaryVariables = new Map, this.type = t
          }
          Copy() {
              let t = new n(this.type, this.currentPointer, this.inExpressionEvaluation);
              return t.temporaryVariables = new Map(this.temporaryVariables), t.evaluationStackHeightWhenPushed = this.evaluationStackHeightWhenPushed, t.functionStartInOutputStream = this.functionStartInOutputStream, t
          }
      }
      t.Element = n;
      class i {
          constructor() {
              if (this.threadIndex = 0, this.previousPointer = k.Null, this.callstack = [], arguments[0] && arguments[1]) {
                  let t = arguments[0],
                      i = arguments[1];
                  this.threadIndex = parseInt(t.threadIndex);
                  let a = t.callstack;
                  for (let t of a) {
                      let a, r = t,
                          s = parseInt(r.type),
                          l = k.Null,
                          o = r.cPath;
                      if (void 0 !== o) {
                          a = o.toString();
                          let t = i.ContentAtPath(new e(a));
                          if (l.container = t.container, l.index = parseInt(r.idx), null == t.obj) throw new Error("When loading state, internal story location couldn't be found: " + a + ". Has the story changed since this save data was created?");
                          if (t.approximate) {
                              if (null === l.container) return d("pointer.container");
                              i.Warning("When loading state, exact internal story location couldn't be found: '" + a + "', so it was approximated to '" + l.container.path.toString() + "' to recover. Has the story changed since this save data was created?")
                          }
                      }
                      let u = !!r.exp,
                          h = new n(s, l, u),
                          c = r.temp;
                      h.temporaryVariables = j.JObjectToDictionaryRuntimeObjs(c), this.callstack.push(h)
                  }
                  let r = t.previousContentObject;
                  if (void 0 !== r) {
                      let t = new e(r.toString());
                      this.previousPointer = i.PointerAtPath(t)
                  }
              }
          }
          Copy() {
              let t = new i;
              t.threadIndex = this.threadIndex;
              for (let e of this.callstack) t.callstack.push(e.Copy());
              return t.previousPointer = this.previousPointer.copy(), t
          }
          get jsonToken() {
              let t = {},
                  e = [];
              for (let t of this.callstack) {
                  let n = {};
                  if (!t.currentPointer.isNull) {
                      if (null === t.currentPointer.container) return d("el.currentPointer.container");
                      n.cPath = t.currentPointer.container.path.componentsString, n.idx = t.currentPointer.index
                  }
                  n.exp = t.inExpressionEvaluation, n.type = t.type, n.temp = j.DictionaryRuntimeObjsToJObject(t.temporaryVariables), e.push(n)
              }
              if (t.callstack = e, t.threadIndex = this.threadIndex, !this.previousPointer.isNull) {
                  let e = this.previousPointer.Resolve();
                  if (null === e) return d("this.previousPointer.Resolve()");
                  t.previousContentObject = e.path.toString()
              }
              return t
          }
      }
      t.Thread = i
  }(J || (J = {}));
  class q {
      constructor(t, e) {
          this.variableChangedEventCallbacks = [], this._batchObservingVariableChanges = !1, this._defaultGlobalVariables = new Map, this._changedVariables = new Set, this._globalVariables = new Map, this._callStack = t, this._listDefsOrigin = e;
          try {
              return new Proxy(this, {
                  get: (t, e) => e in t ? t[e] : t.$(e),
                  set: (t, e, n) => (e in t ? t[e] = n : t.$(e, n), !0)
              })
          } catch (t) {}
      }
      variableChangedEvent(t, e) {
          for (let n of this.variableChangedEventCallbacks) n(t, e)
      }
      get batchObservingVariableChanges() {
          return this._batchObservingVariableChanges
      }
      set batchObservingVariableChanges(t) {
          if (this._batchObservingVariableChanges = t, t) this._changedVariables = new Set;
          else if (null != this._changedVariables)
              for (let t of this._changedVariables) {
                  let e = this._globalVariables.get(t);
                  e ? this.variableChangedEvent(t, e) : d("currentValue")
              }
      }
      get callStack() {
          return this._callStack
      }
      set callStack(t) {
          this._callStack = t
      }
      $(t, e) {
          if (void 0 === e) {
              let e = this._globalVariables.get(t);
              return void 0 === e && (e = this._defaultGlobalVariables.get(t)), void 0 !== e ? e.valueObject : null
          } {
              if (void 0 === this._defaultGlobalVariables.get(t)) throw new C("Cannot assign to a variable (" + t + ") that hasn't been declared in the story");
              let n = y.Create(e);
              if (null == n) throw new C(null == e ? "Cannot pass null to VariableState" : "Invalid value passed to VariableState: " + e.toString());
              this.SetGlobal(t, n)
          }
      }
      CopyFrom(t) {
          if (this._globalVariables = new Map(t._globalVariables), this._defaultGlobalVariables = new Map(t._defaultGlobalVariables), this.variableChangedEvent = t.variableChangedEvent, t.batchObservingVariableChanges != this.batchObservingVariableChanges)
              if (t.batchObservingVariableChanges) {
                  if (this._batchObservingVariableChanges = !0, null === t._changedVariables) return d("toCopy._changedVariables");
                  this._changedVariables = new Set(t._changedVariables)
              } else this._batchObservingVariableChanges = !1, this._changedVariables = null
      }
      get jsonToken() {
          return j.DictionaryRuntimeObjsToJObject(this._globalVariables)
      }
      set jsonToken(t) {
          this._globalVariables = j.JObjectToDictionaryRuntimeObjs(t)
      }
      TryGetDefaultVariableValue(t) {
          let e = v(this._defaultGlobalVariables, t, null);
          return e.exists ? e.result : null
      }
      GlobalVariableExistsWithName(t) {
          return this._globalVariables.has(t)
      }
      GetVariableWithName(t, e = -1) {
          let n = this.GetRawVariableWithName(t, e),
              i = r(n, E);
          return null !== i && (n = this.ValueAtVariablePointer(i)), n
      }
      GetRawVariableWithName(t, e) {
          let n = null;
          if (0 == e || -1 == e) {
              let e = v(this._globalVariables, t, null);
              if (e.exists) return e.result;
              if (null === this._listDefsOrigin) return d("VariablesState._listDefsOrigin");
              let n = this._listDefsOrigin.FindSingleItemListWithName(t);
              if (n) return n
          }
          return n = this._callStack.GetTemporaryVariableWithName(t, e)
      }
      ValueAtVariablePointer(t) {
          return this.GetVariableWithName(t.variableName, t.contextIndex)
      }
      Assign(t, e) {
          let n = t.variableName;
          if (null === n) return d("name");
          let i = -1,
              a = !1;
          if (a = t.isNewDeclaration ? t.isGlobal : this._globalVariables.has(n), t.isNewDeclaration) {
              let t = r(e, E);
              if (null !== t) {
                  e = this.ResolveVariablePointer(t)
              }
          } else {
              let t = null;
              do {
                  null != (t = r(this.GetRawVariableWithName(n, i), E)) && (n = t.variableName, a = 0 == (i = t.contextIndex))
              } while (null != t)
          }
          a ? this.SetGlobal(n, e) : this._callStack.SetTemporaryVariable(n, e, t.isNewDeclaration, i)
      }
      SnapshotDefaultGlobals() {
          this._defaultGlobalVariables = new Map(this._globalVariables)
      }
      RetainListOriginsForAssignment(t, e) {
          let n = s(t, x),
              i = s(e, x);
          n.value && i.value && 0 == i.value.Count && i.value.SetInitialOriginNames(n.value.originNames)
      }
      SetGlobal(t, e) {
          let n = v(this._globalVariables, t, null);
          if (n.exists && x.RetainListOriginsForAssignment(n.result, e), null === t) return d("variableName");
          if (this._globalVariables.set(t, e), null != this.variableChangedEvent && e !== n.result)
              if (this.batchObservingVariableChanges) {
                  if (null === this._changedVariables) return d("this._changedVariables");
                  this._changedVariables.add(t)
              } else this.variableChangedEvent(t, e)
      }
      ResolveVariablePointer(t) {
          let e = t.contextIndex; - 1 == e && (e = this.GetContextIndexOfVariableNamed(t.variableName));
          let n = r(this.GetRawVariableWithName(t.variableName, e), E);
          return null != n ? n : new E(t.variableName, e)
      }
      GetContextIndexOfVariableNamed(t) {
          return this._globalVariables.get(t) ? 0 : this._callStack.currentElementIndex
      }
      ObserveVariableChange(t) {
          this.variableChangedEventCallbacks.push(t)
      }
  }
  class K {
      constructor(t) {
          this.seed = t % 2147483647, this.seed <= 0 && (this.seed += 2147483646)
      }
      next() {
          return this.seed = 16807 * this.seed % 2147483647
      }
      nextFloat() {
          return (this.next() - 1) / 2147483646
      }
  }
  class U {
      constructor(t) {
          this.kInkSaveStateVersion = 8, this.kMinCompatibleLoadVersion = 8, this._currentErrors = null, this._currentWarnings = null, this.divertedPointer = k.Null, this._currentTurnIndex = 0, this.storySeed = 0, this.previousRandom = 0, this.didSafeExit = !1, this._currentText = null, this._currentTags = null, this._outputStreamTextDirty = !0, this._outputStreamTagsDirty = !0, this.story = t, this._outputStream = [], this.OutputStreamDirty(), this._evaluationStack = [], this.callStack = new J(t.rootContentContainer), this._variablesState = new q(this.callStack, t.listDefinitions), this._visitCounts = new Map, this._turnIndices = new Map, this._currentTurnIndex = -1;
          let e = (new Date).getTime();
          this.storySeed = new K(e).next() % 100, this.previousRandom = 0, this._currentChoices = [], this.GoToStart()
      }
      ToJson(t = !1) {
          return JSON.stringify(this.jsonToken, null, t ? 2 : 0)
      }
      toJson(t = !1) {
          return this.ToJson(t)
      }
      LoadJson(t) {
          this.jsonToken = JSON.parse(t)
      }
      VisitCountAtPathString(t) {
          let e = v(this.visitCounts, t, null);
          return e.exists ? e.result : 0
      }
      get callstackDepth() {
          return this.callStack.depth
      }
      get outputStream() {
          return this._outputStream
      }
      get currentChoices() {
          return this.canContinue ? [] : this._currentChoices
      }
      get generatedChoices() {
          return this._currentChoices
      }
      get currentErrors() {
          return this._currentErrors
      }
      get currentWarnings() {
          return this._currentWarnings
      }
      get variablesState() {
          return this._variablesState
      }
      get evaluationStack() {
          return this._evaluationStack
      }
      get visitCounts() {
          return this._visitCounts
      }
      get turnIndices() {
          return this._turnIndices
      }
      get currentTurnIndex() {
          return this._currentTurnIndex
      }
      get currentPathString() {
          let t = this.currentPointer;
          return t.isNull ? null : null === t.path ? d("pointer.path") : t.path.toString()
      }
      get currentPointer() {
          return this.callStack.currentElement.currentPointer.copy()
      }
      set currentPointer(t) {
          this.callStack.currentElement.currentPointer = t.copy()
      }
      get previousPointer() {
          return this.callStack.currentThread.previousPointer.copy()
      }
      set previousPointer(t) {
          this.callStack.currentThread.previousPointer = t.copy()
      }
      get canContinue() {
          return !this.currentPointer.isNull && !this.hasError
      }
      get hasError() {
          return null != this.currentErrors && this.currentErrors.length > 0
      }
      get hasWarning() {
          return null != this.currentWarnings && this.currentWarnings.length > 0
      }
      get currentText() {
          if (this._outputStreamTextDirty) {
              let t = new m;
              for (let e of this._outputStream) {
                  let n = r(e, _);
                  null !== n && t.Append(n.value)
              }
              this._currentText = this.CleanOutputWhitespace(t.toString()), this._outputStreamTextDirty = !1
          }
          return this._currentText
      }
      CleanOutputWhitespace(t) {
          let e = new m,
              n = -1,
              i = 0;
          for (let a = 0; a < t.length; a++) {
              let r = t.charAt(a),
                  s = " " == r || "\t" == r;
              s && -1 == n && (n = a), s || ("\n" != r && n > 0 && n != i && e.Append(" "), n = -1), "\n" == r && (i = a + 1), s || e.Append(r)
          }
          return e.toString()
      }
      get currentTags() {
          if (this._outputStreamTagsDirty) {
              this._currentTags = [];
              for (let t of this._outputStream) {
                  let e = r(t, M);
                  null !== e && this._currentTags.push(e.text)
              }
              this._outputStreamTagsDirty = !1
          }
          return this._currentTags
      }
      get inExpressionEvaluation() {
          return this.callStack.currentElement.inExpressionEvaluation
      }
      set inExpressionEvaluation(t) {
          this.callStack.currentElement.inExpressionEvaluation = t
      }
      GoToStart() {
          this.callStack.currentElement.currentPointer = k.StartOf(this.story.mainContentContainer)
      }
      Copy() {
          let t = new U(this.story);
          return t.outputStream.push.apply(t.outputStream, this._outputStream), this.OutputStreamDirty(), t._currentChoices.push.apply(t._currentChoices, this._currentChoices), this.hasError && (t._currentErrors = [], t._currentErrors.push.apply(t._currentErrors, this.currentErrors || [])), this.hasWarning && (t._currentWarnings = [], t._currentWarnings.push.apply(t._currentWarnings, this.currentWarnings || [])), t.callStack = new J(this.callStack), t._variablesState = new q(t.callStack, this.story.listDefinitions), t.variablesState.CopyFrom(this.variablesState), t.evaluationStack.push.apply(t.evaluationStack, this.evaluationStack), this.divertedPointer.isNull || (t.divertedPointer = this.divertedPointer.copy()), t.previousPointer = this.previousPointer.copy(), t._visitCounts = new Map(this.visitCounts), t._turnIndices = new Map(this.turnIndices), t._currentTurnIndex = this.currentTurnIndex, t.storySeed = this.storySeed, t.previousRandom = this.previousRandom, t.didSafeExit = this.didSafeExit, t
      }
      get jsonToken() {
          let t, e = {};
          for (let e of this._currentChoices) {
              if (null === e.threadAtGeneration) return d("c.threadAtGeneration");
              e.originalThreadIndex = e.threadAtGeneration.threadIndex, null == this.callStack.ThreadWithIndex(e.originalThreadIndex) && (null == t && (t = new Map), t[e.originalThreadIndex.toString()] = e.threadAtGeneration.jsonToken)
          }
          if (null != t && (e.choiceThreads = t), e.callstackThreads = this.callStack.GetJsonToken(), e.variablesState = this.variablesState.jsonToken, e.evalStack = j.ListToJArray(this.evaluationStack), e.outputStream = j.ListToJArray(this._outputStream), e.currentChoices = j.ListToJArray(this._currentChoices), !this.divertedPointer.isNull) {
              if (null === this.divertedPointer.path) return d("this.divertedPointer.path");
              e.currentDivertTarget = this.divertedPointer.path.componentsString
          }
          return e.visitCounts = j.IntDictionaryToJObject(this.visitCounts), e.turnIndices = j.IntDictionaryToJObject(this.turnIndices), e.turnIdx = this.currentTurnIndex, e.storySeed = this.storySeed, e.previousRandom = this.previousRandom, e.inkSaveVersion = this.kInkSaveStateVersion, e.inkFormatVersion = this.story.inkVersionCurrent, e
      }
      set jsonToken(t) {
          let n = t,
              i = n.inkSaveVersion;
          if (null == i) throw new C("ink save format incorrect, can't load.");
          if (parseInt(i) < this.kMinCompatibleLoadVersion) throw new C("Ink save format isn't compatible with the current version (saw '" + i + "', but minimum is " + this.kMinCompatibleLoadVersion + "), so can't load.");
          this.callStack.SetJsonToken(n.callstackThreads, this.story), this.variablesState.jsonToken = n.variablesState, this._evaluationStack = j.JArrayToRuntimeObjList(n.evalStack), this._outputStream = j.JArrayToRuntimeObjList(n.outputStream), this.OutputStreamDirty(), this._currentChoices = j.JArrayToRuntimeObjList(n.currentChoices);
          let a = n.currentDivertTarget;
          if (null != a) {
              let t = new e(a.toString());
              this.divertedPointer = this.story.PointerAtPath(t)
          }
          this._visitCounts = j.JObjectToIntDictionary(n.visitCounts), this._turnIndices = j.JObjectToIntDictionary(n.turnIndices), this._currentTurnIndex = parseInt(n.turnIdx), this.storySeed = parseInt(n.storySeed), this.previousRandom = parseInt(n.previousRandom);
          let r = n.choiceThreads;
          for (let t of this._currentChoices) {
              let e = this.callStack.ThreadWithIndex(t.originalThreadIndex);
              if (null != e) t.threadAtGeneration = e.Copy();
              else {
                  let e = r[t.originalThreadIndex.toString()];
                  t.threadAtGeneration = new J.Thread(e, this.story)
              }
          }
      }
      ResetErrors() {
          this._currentErrors = null, this._currentWarnings = null
      }
      ResetOutput(t = null) {
          this._outputStream.length = 0, null !== t && this._outputStream.push.apply(this._outputStream, t), this.OutputStreamDirty()
      }
      PushToOutputStream(t) {
          let e = r(t, _);
          if (null !== e) {
              let t = this.TrySplittingHeadTailWhitespace(e);
              if (null !== t) {
                  for (let e of t) this.PushToOutputStreamIndividual(e);
                  return void this.OutputStreamDirty()
              }
          }
          this.PushToOutputStreamIndividual(t), this.OutputStreamDirty()
      }
      PopFromOutputStream(t) {
          this.outputStream.splice(this.outputStream.length - t, t), this.OutputStreamDirty()
      }
      TrySplittingHeadTailWhitespace(t) {
          let e = t.value;
          if (null === e) return d("single.value");
          let n = -1,
              i = -1;
          for (let t = 0; t < e.length; ++t) {
              let a = e[t];
              if ("\n" != a) {
                  if (" " == a || "\t" == a) continue;
                  break
              } - 1 == n && (n = t), i = t
          }
          let a = -1,
              r = -1;
          for (let t = 0; t < e.length; ++t) {
              let n = e[t];
              if ("\n" != n) {
                  if (" " == n || "\t" == n) continue;
                  break
              } - 1 == a && (a = t), r = t
          }
          if (-1 == n && -1 == a) return null;
          let s = [],
              l = 0,
              o = e.length;
          if (-1 != n) {
              if (n > 0) {
                  let t = new _(e.substring(0, n));
                  s.push(t)
              }
              s.push(new _("\n")), l = i + 1
          }
          if (-1 != a && (o = r), o > l) {
              let t = e.substring(l, o - l);
              s.push(new _(t))
          }
          if (-1 != a && r > i && (s.push(new _("\n")), a < e.length - 1)) {
              let t = e.length - a - 1,
                  n = new _(e.substring(a + 1, t));
              s.push(n)
          }
          return s
      }
      PushToOutputStreamIndividual(t) {
          let e = r(t, P),
              n = r(t, _),
              i = !0;
          if (e) this.TrimNewlinesFromOutputStream(), i = !0;
          else if (n) {
              let t = -1,
                  e = this.callStack.currentElement;
              e.type == a.Function && (t = e.functionStartInOutputStream);
              let r = -1;
              for (let e = this._outputStream.length - 1; e >= 0; e--) {
                  let n = this._outputStream[e],
                      i = n instanceof A ? n : null;
                  if (null != (n instanceof P ? n : null)) {
                      r = e;
                      break
                  }
                  if (null != i && i.commandType == A.CommandType.BeginString) {
                      e >= t && (t = -1);
                      break
                  }
              }
              let s = -1;
              if (-1 != (s = -1 != r && -1 != t ? Math.min(t, r) : -1 != r ? r : t)) {
                  if (n.isNewline) i = !1;
                  else if (n.isNonWhitespace && (r > -1 && this.RemoveExistingGlue(), t > -1)) {
                      let t = this.callStack.elements;
                      for (let e = t.length - 1; e >= 0; e--) {
                          let n = t[e];
                          if (n.type != a.Function) break;
                          n.functionStartInOutputStream = -1
                      }
                  }
              } else n.isNewline && (!this.outputStreamEndsInNewline && this.outputStreamContainsContent || (i = !1))
          }
          if (i) {
              if (null === t) return d("obj");
              this._outputStream.push(t), this.OutputStreamDirty()
          }
      }
      TrimNewlinesFromOutputStream() {
          let t = -1,
              e = this._outputStream.length - 1;
          for (; e >= 0;) {
              let n = this._outputStream[e],
                  i = r(n, A),
                  a = r(n, _);
              if (null != i || null != a && a.isNonWhitespace) break;
              null != a && a.isNewline && (t = e), e--
          }
          if (t >= 0)
              for (e = t; e < this._outputStream.length;) {
                  r(this._outputStream[e], _) ? this._outputStream.splice(e, 1) : e++
              }
          this.OutputStreamDirty()
      }
      RemoveExistingGlue() {
          for (let t = this._outputStream.length - 1; t >= 0; t--) {
              let e = this._outputStream[t];
              if (e instanceof P) this._outputStream.splice(t, 1);
              else if (e instanceof A) break
          }
          this.OutputStreamDirty()
      }
      get outputStreamEndsInNewline() {
          if (this._outputStream.length > 0)
              for (let t = this._outputStream.length - 1; t >= 0; t--) {
                  if (this._outputStream[t] instanceof A) break;
                  let e = this._outputStream[t];
                  if (e instanceof _) {
                      if (e.isNewline) return !0;
                      if (e.isNonWhitespace) break
                  }
              }
          return !1
      }
      get outputStreamContainsContent() {
          for (let t = 0; t < this._outputStream.length; t++)
              if (this._outputStream[t] instanceof _) return !0;
          return !1
      }
      get inStringEvaluation() {
          for (let t = this._outputStream.length - 1; t >= 0; t--) {
              let e = r(this._outputStream[t], A);
              if (e instanceof A && e.commandType == A.CommandType.BeginString) return !0
          }
          return !1
      }
      PushEvaluationStack(t) {
          let e = r(t, x);
          if (e) {
              let t = e.value;
              if (null === t) return d("rawList");
              if (null != t.originNames) {
                  t.origins || (t.origins = []), t.origins.length = 0;
                  for (let e of t.originNames) {
                      if (null === this.story.listDefinitions) return d("StoryState.story.listDefinitions");
                      let n = this.story.listDefinitions.TryListGetDefinition(e, null);
                      if (null === n.result) return d("StoryState def.result");
                      t.origins.indexOf(n.result) < 0 && t.origins.push(n.result)
                  }
              }
          }
          if (null === t) return d("obj");
          this.evaluationStack.push(t)
      }
      PopEvaluationStack(t) {
          if (void 0 === t) {
              return u(this.evaluationStack.pop())
          }
          if (t > this.evaluationStack.length) throw new Error("trying to pop too many objects");
          return u(this.evaluationStack.splice(this.evaluationStack.length - t, t))
      }
      PeekEvaluationStack() {
          return this.evaluationStack[this.evaluationStack.length - 1]
      }
      ForceEnd() {
          for (; this.callStack.canPopThread;) this.callStack.PopThread();
          for (; this.callStack.canPop;) this.PopCallStack();
          this._currentChoices.length = 0, this.currentPointer = k.Null, this.previousPointer = k.Null, this.didSafeExit = !0
      }
      TrimWhitespaceFromFunctionEnd() {
          n.Assert(this.callStack.currentElement.type == a.Function);
          let t = this.callStack.currentElement.functionStartInOutputStream; - 1 == t && (t = 0);
          for (let e = this._outputStream.length - 1; e >= t; e--) {
              let t = this._outputStream[e],
                  n = r(t, _),
                  i = r(t, A);
              if (null != n) {
                  if (i) break;
                  if (!n.isNewline && !n.isInlineWhitespace) break;
                  this._outputStream.splice(e, 1), this.OutputStreamDirty()
              }
          }
      }
      PopCallStack(t = null) {
          this.callStack.currentElement.type == a.Function && this.TrimWhitespaceFromFunctionEnd(), this.callStack.Pop(t)
      }
      SetChosenPath(t, e) {
          this._currentChoices.length = 0;
          let n = this.story.PointerAtPath(t);
          n.isNull || -1 != n.index || (n.index = 0), this.currentPointer = n, e && this._currentTurnIndex++
      }
      StartFunctionEvaluationFromGame(t, e) {
          this.callStack.Push(a.FunctionEvaluationFromGame, this.evaluationStack.length), this.callStack.currentElement.currentPointer = k.StartOf(t), this.PassArgumentsToEvaluationStack(e)
      }
      PassArgumentsToEvaluationStack(t) {
          if (null != t)
              for (let e = 0; e < t.length; e++) {
                  if ("number" != typeof t[e] && "string" != typeof t[e]) throw new Error("ink arguments when calling EvaluateFunction / ChoosePathStringWithParameters  must be int, float or string");
                  this.PushEvaluationStack(y.Create(t[e]))
              }
      }
      TryExitFunctionEvaluationFromGame() {
          return this.callStack.currentElement.type == a.FunctionEvaluationFromGame && (this.currentPointer = k.Null, this.didSafeExit = !0, !0)
      }
      CompleteFunctionEvaluationFromGame() {
          if (this.callStack.currentElement.type != a.FunctionEvaluationFromGame) throw new C("Expected external function evaluation to be complete. Stack trace: " + this.callStack.callStackTrace);
          let t = this.callStack.currentElement.evaluationStackHeightWhenPushed,
              e = null;
          for (; this.evaluationStack.length > t;) {
              let t = this.PopEvaluationStack();
              null === e && (e = t)
          }
          if (this.PopCallStack(a.FunctionEvaluationFromGame), e) {
              if (e instanceof R) return null;
              let t = s(e, y);
              return t.valueType == i.DivertTarget ? t.valueObject.toString() : t.valueObject
          }
          return null
      }
      AddError(t, e) {
          e ? (null == this._currentWarnings && (this._currentWarnings = []), this._currentWarnings.push(t)) : (null == this._currentErrors && (this._currentErrors = []), this._currentErrors.push(t))
      }
      OutputStreamDirty() {
          this._outputStreamTextDirty = !0, this._outputStreamTagsDirty = !0
      }
  }
  class z {
      constructor() {
          this.startTime = void 0
      }
      get ElapsedMilliseconds() {
          return void 0 === this.startTime ? 0 : (new Date).getTime() - this.startTime
      }
      Start() {
          this.startTime = (new Date).getTime()
      }
      Stop() {
          this.startTime = void 0
      }
  }
  Number.isInteger || (Number.isInteger = function(t) {
      return "number" == typeof t && isFinite(t) && t > -9007199254740992 && t < 9007199254740992 && Math.floor(t) === t
  });
  class H extends p {
      constructor() {
          let t;
          super(), this.inkVersionCurrent = 19, this.inkVersionMinimumCompatible = 18, this._prevContainers = [], this.allowExternalFunctionFallbacks = !1, this._listDefinitions = null, this._variableObservers = null, this._hasValidatedExternals = !1, this._temporaryEvaluationContainer = null, this._asyncContinueActive = !1, this._stateAtLastNewline = null, this._recursiveContinueCount = 0, this._profiler = null;
          let e = null,
              n = null;
          if (arguments[0] instanceof O) t = arguments[0], void 0 !== arguments[1] && (e = arguments[1]), this._mainContentContainer = t;
          else if ("string" == typeof arguments[0]) {
              let t = arguments[0];
              n = JSON.parse(t)
          } else n = arguments[0];
          if (null != e && (this._listDefinitions = new W(e)), this._externals = new Map, null !== n) {
              let t = n,
                  e = t.inkVersion;
              if (null == e) throw new Error("ink version number not found. Are you sure it's a valid .ink.json file?");
              let i = parseInt(e);
              if (i > this.inkVersionCurrent) throw new Error("Version of ink used to build story was newer than the current version of the engine");
              if (i < this.inkVersionMinimumCompatible) throw new Error("Version of ink used to build story is too old to be loaded by this version of the engine");
              i != this.inkVersionCurrent && console.warn("WARNING: Version of ink used to build story doesn't match current version of engine. Non-critical, but recommend synchronising.");
              let a, r = t.root;
              if (null == r) throw new Error("Root node for ink not found. Are you sure it's a valid .ink.json file?");
              (a = t.listDefs) && (this._listDefinitions = j.JTokenToListDefinitions(a)), this._mainContentContainer = s(j.JTokenToRuntimeObject(r), O), this.ResetState()
          }
      }
      get currentChoices() {
          let t = [];
          if (null === this._state) return d("this._state");
          for (let e of this._state.currentChoices) e.isInvisibleDefault || (e.index = t.length, t.push(e));
          return t
      }
      get currentText() {
          return this.IfAsyncWeCant("call currentText since it's a work in progress"), this.state.currentText
      }
      get currentTags() {
          return this.IfAsyncWeCant("call currentTags since it's a work in progress"), this.state.currentTags
      }
      get currentErrors() {
          return this.state.currentErrors
      }
      get currentWarnings() {
          return this.state.currentWarnings
      }
      get hasError() {
          return this.state.hasError
      }
      get hasWarning() {
          return this.state.hasWarning
      }
      get variablesState() {
          return this.state.variablesState
      }
      get listDefinitions() {
          return this._listDefinitions
      }
      get state() {
          return this._state
      }
      StartProfiling() {}
      EndProfiling() {}
      ToJsonString() {
          let t = j.RuntimeObjectToJToken(this._mainContentContainer),
              e = {};
          return e.inkVersion = this.inkVersionCurrent, e.root = t, null != this._listDefinitions && (e.listDefs = j.ListDefinitionsToJToken(this._listDefinitions)), JSON.stringify(e)
      }
      ResetState() {
          this.IfAsyncWeCant("ResetState"), this._state = new U(this), this._state.variablesState.ObserveVariableChange(this.VariableStateDidChangeEvent.bind(this)), this.ResetGlobals()
      }
      ResetErrors() {
          if (null === this._state) return d("this._state");
          this._state.ResetErrors()
      }
      ResetCallstack() {
          if (this.IfAsyncWeCant("ResetCallstack"), null === this._state) return d("this._state");
          this._state.ForceEnd()
      }
      ResetGlobals() {
          if (this._mainContentContainer.namedContent.get("global decl")) {
              let t = this.state.currentPointer.copy();
              this.ChoosePath(new e("global decl"), !1), this.ContinueInternal(), this.state.currentPointer = t
          }
          this.state.variablesState.SnapshotDefaultGlobals()
      }
      Continue() {
          return this.ContinueAsync(0), this.currentText
      }
      get canContinue() {
          return this.state.canContinue
      }
      get asyncContinueComplete() {
          return !this._asyncContinueActive
      }
      ContinueAsync(t) {
          this._hasValidatedExternals || this.ValidateExternalBindings(), this.ContinueInternal(t)
      }
      ContinueInternal(t = 0) {
          null != this._profiler && this._profiler.PreContinue();
          let e = t > 0;
          if (this._recursiveContinueCount++, !this._asyncContinueActive) {
              if (this._asyncContinueActive = e, !this.canContinue) throw new C("Can't continue - should check canContinue before calling Continue");
              this._state.didSafeExit = !1, this._state.ResetOutput(), 1 == this._recursiveContinueCount && (this._state.variablesState.batchObservingVariableChanges = !0)
          }
          let n = new z;
          n.Start();
          let i = !1;
          do {
              try {
                  i = this.ContinueSingleStep()
              } catch (t) {
                  if (!(t instanceof C)) throw t;
                  this.AddError(t.message, void 0, t.useEndLineNumber);
                  break
              }
              if (i) break;
              if (this._asyncContinueActive && n.ElapsedMilliseconds > t) break
          } while (this.canContinue);
          n.Stop(), !i && this.canContinue || (null != this._stateAtLastNewline && (this.RestoreStateSnapshot(this._stateAtLastNewline), this._stateAtLastNewline = null), this.canContinue || (this.state.callStack.canPopThread && this.AddError("Thread available to pop, threads should always be flat by the end of evaluation?"), 0 != this.state.generatedChoices.length || this.state.didSafeExit || null != this._temporaryEvaluationContainer || (this.state.callStack.CanPop(a.Tunnel) ? this.AddError("unexpectedly reached end of content. Do you need a '->->' to return from a tunnel?") : this.state.callStack.CanPop(a.Function) ? this.AddError("unexpectedly reached end of content. Do you need a '~ return'?") : this.state.callStack.canPop ? this.AddError("unexpectedly reached end of content for unknown reason. Please debug compiler!") : this.AddError("ran out of content. Do you need a '-> DONE' or '-> END'?"))), this.state.didSafeExit = !1, 1 == this._recursiveContinueCount && (this._state.variablesState.batchObservingVariableChanges = !1), this._asyncContinueActive = !1), this._recursiveContinueCount--, null != this._profiler && this._profiler.PostContinue()
      }
      ContinueSingleStep() {
          if (null != this._profiler && this._profiler.PreStep(), this.Step(), null != this._profiler && this._profiler.PostStep(), this.canContinue || this.state.callStack.elementIsEvaluateFromGame || this.TryFollowDefaultInvisibleChoice(), null != this._profiler && this._profiler.PreSnapshot(), !this.state.inStringEvaluation) {
              if (null != this._stateAtLastNewline) {
                  if (null === this._stateAtLastNewline.currentTags) return d("this._stateAtLastNewline.currentTags");
                  if (null === this.state.currentTags) return d("this.state.currentTags");
                  let t = this.CalculateNewlineOutputStateChange(this._stateAtLastNewline.currentText, this.state.currentText, this._stateAtLastNewline.currentTags.length, this.state.currentTags.length);
                  if (t == H.OutputStateChange.ExtendedBeyondNewline) return this.RestoreStateSnapshot(this._stateAtLastNewline), !0;
                  t == H.OutputStateChange.NewlineRemoved && (this._stateAtLastNewline = null)
              }
              this.state.outputStreamEndsInNewline && (this.canContinue ? null == this._stateAtLastNewline && (this._stateAtLastNewline = this.StateSnapshot()) : this._stateAtLastNewline = null)
          }
          return null != this._profiler && this._profiler.PostSnapshot(), !1
      }
      CalculateNewlineOutputStateChange(t, e, n, i) {
          if (null === t) return d("prevText");
          if (null === e) return d("currText");
          let a = e.length >= t.length && "\n" == e.charAt(t.length - 1);
          if (n == i && t.length == e.length && a) return H.OutputStateChange.NoChange;
          if (!a) return H.OutputStateChange.NewlineRemoved;
          if (i > n) return H.OutputStateChange.ExtendedBeyondNewline;
          for (let n = t.length; n < e.length; n++) {
              let t = e.charAt(n);
              if (" " != t && "\t" != t) return H.OutputStateChange.ExtendedBeyondNewline
          }
          return H.OutputStateChange.NoChange
      }
      ContinueMaximally() {
          this.IfAsyncWeCant("ContinueMaximally");
          let t = new m;
          for (; this.canContinue;) t.Append(this.Continue());
          return t.toString()
      }
      ContentAtPath(t) {
          return this.mainContentContainer.ContentAtPath(t)
      }
      KnotContainerWithName(t) {
          let e = this.mainContentContainer.namedContent.get(t);
          return e instanceof O ? e : null
      }
      PointerAtPath(t) {
          if (0 == t.length) return k.Null;
          let e = new k,
              n = t.length,
              i = null;
          return null === t.lastComponent ? d("path.lastComponent") : (t.lastComponent.isIndex ? (n = t.length - 1, i = this.mainContentContainer.ContentAtPath(t, void 0, n), e.container = i.container, e.index = t.lastComponent.index) : (i = this.mainContentContainer.ContentAtPath(t), e.container = i.container, e.index = -1), null == i.obj || i.obj == this.mainContentContainer && n > 0 ? this.Error("Failed to find content at path '" + t + "', and no approximation of it was possible.") : i.approximate && this.Warning("Failed to find content at path '" + t + "', so it was approximated to: '" + i.obj.path + "'."), e)
      }
      StateSnapshot() {
          return this.state.Copy()
      }
      RestoreStateSnapshot(t) {
          this._state = t
      }
      Step() {
          let t = !0,
              e = this.state.currentPointer.copy();
          if (e.isNull) return;
          let n = r(e.Resolve(), O);
          for (; n && (this.VisitContainer(n, !0), 0 != n.content.length);) n = r((e = k.StartOf(n)).Resolve(), O);
          this.state.currentPointer = e.copy(), null != this._profiler && this._profiler.Step(this.state.callStack);
          let i = e.Resolve(),
              a = this.PerformLogicAndFlowControl(i);
          if (this.state.currentPointer.isNull) return;
          a && (t = !1);
          let s = r(i, F);
          if (s) {
              let e = this.ProcessChoice(s);
              e && this.state.generatedChoices.push(e), i = null, t = !1
          }
          if (i instanceof O && (t = !1), t) {
              let t = r(i, E);
              if (t && -1 == t.contextIndex) {
                  let e = this.state.callStack.ContextForVariableNamed(t.variableName);
                  i = new E(t.variableName, e)
              }
              this.state.inExpressionEvaluation ? this.state.PushEvaluationStack(i) : this.state.PushToOutputStream(i)
          }
          this.NextContent();
          let l = r(i, A);
          l && l.commandType == A.CommandType.StartThread && this.state.callStack.PushThread()
      }
      VisitContainer(t, e) {
          t.countingAtStartOnly && !e || (t.visitsShouldBeCounted && this.IncrementVisitCountForContainer(t), t.turnIndexShouldBeCounted && this.RecordTurnIndexVisitToContainer(t))
      }
      VisitChangedContainersDueToDivert() {
          let t = this.state.previousPointer.copy(),
              e = this.state.currentPointer.copy();
          if (e.isNull || -1 == e.index) return;
          if (this._prevContainers.length = 0, !t.isNull) {
              let e = r(t.Resolve(), O) || r(t.container, O);
              for (; e;) this._prevContainers.push(e), e = r(e.parent, O)
          }
          let n = e.Resolve();
          if (null == n) return;
          let i = r(n.parent, O);
          for (; i && (this._prevContainers.indexOf(i) < 0 || i.countingAtStartOnly);) {
              let t = i.content.length > 0 && n == i.content[0];
              this.VisitContainer(i, t), n = i, i = r(i.parent, O)
          }
      }
      ProcessChoice(t) {
          let e = !0;
          if (t.hasCondition) {
              let t = this.state.PopEvaluationStack();
              this.IsTruthy(t) || (e = !1)
          }
          let n = "",
              i = "";
          if (t.hasChoiceOnlyContent) {
              i = s(this.state.PopEvaluationStack(), _).value || ""
          }
          if (t.hasStartContent) {
              n = s(this.state.PopEvaluationStack(), _).value || ""
          }
          if (t.onceOnly) {
              this.VisitCountForContainer(t.choiceTarget) > 0 && (e = !1)
          }
          if (!e) return null;
          let a = new G;
          return a.targetPath = t.pathOnChoice, a.sourcePath = t.path.toString(), a.isInvisibleDefault = t.isInvisibleDefault, a.threadAtGeneration = this.state.callStack.currentThread.Copy(), a.text = (n + i).replace(/^[ \t]+|[ \t]+$/g, ""), a
      }
      IsTruthy(t) {
          if (t instanceof y) {
              let e = t;
              if (e instanceof w) {
                  let t = e;
                  return this.Error("Shouldn't use a divert target (to " + t.targetPath + ") as a conditional value. Did you intend a function call 'likeThis()' or a read count check 'likeThis'? (no arrows)"), !1
              }
              return e.isTruthy
          }
          return !1
      }
      PerformLogicAndFlowControl(t) {
          if (null == t) return !1;
          if (t instanceof I) {
              let e = t;
              if (e.isConditional) {
                  let t = this.state.PopEvaluationStack();
                  if (!this.IsTruthy(t)) return !0
              }
              if (e.hasVariableTarget) {
                  let t = e.variableDivertName,
                      n = this.state.variablesState.GetVariableWithName(t);
                  if (null == n) this.Error("Tried to divert using a target from a variable that could not be found (" + t + ")");
                  else if (!(n instanceof w)) {
                      let e = r(n, T),
                          i = "Tried to divert to a target from a variable, but the variable (" + t + ") didn't contain a divert target, it ";
                      e instanceof T && 0 == e.value ? i += "was empty/null (the value 0)." : i += "contained '" + n + "'.", this.Error(i)
                  }
                  let i = s(n, w);
                  this.state.divertedPointer = this.PointerAtPath(i.targetPath)
              } else {
                  if (e.isExternal) return this.CallExternalFunction(e.targetPathString, e.externalArgs), !0;
                  this.state.divertedPointer = e.targetPointer.copy()
              }
              return e.pushesToStack && this.state.callStack.Push(e.stackPushType, void 0, this.state.outputStream.length), this.state.divertedPointer.isNull && !e.isExternal && (e && e.debugMetadata && null != e.debugMetadata.sourceName ? this.Error("Divert target doesn't exist: " + e.debugMetadata.sourceName) : this.Error("Divert resolution failed: " + e)), !0
          }
          if (t instanceof A) {
              let e = t;
              switch (e.commandType) {
                  case A.CommandType.EvalStart:
                      this.Assert(!1 === this.state.inExpressionEvaluation, "Already in expression evaluation?"), this.state.inExpressionEvaluation = !0;
                      break;
                  case A.CommandType.EvalEnd:
                      this.Assert(!0 === this.state.inExpressionEvaluation, "Not in expression evaluation mode"), this.state.inExpressionEvaluation = !1;
                      break;
                  case A.CommandType.EvalOutput:
                      if (this.state.evaluationStack.length > 0) {
                          let t = this.state.PopEvaluationStack();
                          if (!(t instanceof R)) {
                              let e = new _(t.toString());
                              this.state.PushToOutputStream(e)
                          }
                      }
                      break;
                  case A.CommandType.NoOp:
                      break;
                  case A.CommandType.Duplicate:
                      this.state.PushEvaluationStack(this.state.PeekEvaluationStack());
                      break;
                  case A.CommandType.PopEvaluatedValue:
                      this.state.PopEvaluationStack();
                      break;
                  case A.CommandType.PopFunction:
                  case A.CommandType.PopTunnel:
                      let t = e.commandType == A.CommandType.PopFunction ? a.Function : a.Tunnel,
                          n = null;
                      if (t == a.Tunnel) {
                          let t = this.state.PopEvaluationStack();
                          null === (n = r(t, w)) && this.Assert(t instanceof R, "Expected void if ->-> doesn't override target")
                      }
                      if (this.state.TryExitFunctionEvaluationFromGame()) break;
                      if (this.state.callStack.currentElement.type == t && this.state.callStack.canPop) this.state.PopCallStack(), n && (this.state.divertedPointer = this.PointerAtPath(n.targetPath));
                      else {
                          let e = new Map;
                          e.set(a.Function, "function return statement (~ return)"), e.set(a.Tunnel, "tunnel onwards statement (->->)");
                          let n = e.get(this.state.callStack.currentElement.type);
                          this.state.callStack.canPop || (n = "end of flow (-> END or choice)");
                          let i = "Found " + e.get(t) + ", when expected " + n;
                          this.Error(i)
                      }
                      break;
                  case A.CommandType.BeginString:
                      this.state.PushToOutputStream(e), this.Assert(!0 === this.state.inExpressionEvaluation, "Expected to be in an expression when evaluating a string"), this.state.inExpressionEvaluation = !1;
                      break;
                  case A.CommandType.EndString:
                      let i = [],
                          l = 0;
                      for (let t = this.state.outputStream.length - 1; t >= 0; --t) {
                          let e = this.state.outputStream[t];
                          l++;
                          let n = r(e, A);
                          if (n && n.commandType == A.CommandType.BeginString) break;
                          e instanceof _ && i.push(e)
                      }
                      this.state.PopFromOutputStream(l), i = i.reverse();
                      let o = new m;
                      for (let t of i) o.Append(t.toString());
                      this.state.inExpressionEvaluation = !0, this.state.PushEvaluationStack(new _(o.toString()));
                      break;
                  case A.CommandType.ChoiceCount:
                      let u = this.state.generatedChoices.length;
                      this.state.PushEvaluationStack(new T(u));
                      break;
                  case A.CommandType.Turns:
                      this.state.PushEvaluationStack(new T(this.state.currentTurnIndex + 1));
                      break;
                  case A.CommandType.TurnsSince:
                  case A.CommandType.ReadCount:
                      let h = this.state.PopEvaluationStack();
                      if (!(h instanceof w)) {
                          let t = "";
                          h instanceof T && (t = ". Did you accidentally pass a read count ('knot_name') instead of a target ('-> knot_name')?"), this.Error("TURNS_SINCE / READ_COUNT expected a divert target (knot, stitch, label name), but saw " + h + t);
                          break
                      }
                      let c, p = s(h, w),
                          v = r(this.ContentAtPath(p.targetPath).correctObj, O);
                      null != v ? c = e.commandType == A.CommandType.TurnsSince ? this.TurnsSinceForContainer(v) : this.VisitCountForContainer(v) : (c = e.commandType == A.CommandType.TurnsSince ? -1 : 0, this.Warning("Failed to find container for " + e.toString() + " lookup at " + p.targetPath.toString())), this.state.PushEvaluationStack(new T(c));
                      break;
                  case A.CommandType.Random: {
                      let t = r(this.state.PopEvaluationStack(), T),
                          e = r(this.state.PopEvaluationStack(), T);
                      if (null == e || e instanceof T == !1) return this.Error("Invalid value for minimum parameter of RANDOM(min, max)");
                      if (null == t || e instanceof T == !1) return this.Error("Invalid value for maximum parameter of RANDOM(min, max)");
                      if (null === t.value) return d("maxInt.value");
                      if (null === e.value) return d("minInt.value");
                      let n = t.value - e.value + 1;
                      n <= 0 && this.Error("RANDOM was called with minimum as " + e.value + " and maximum as " + t.value + ". The maximum must be larger");
                      let i = this.state.storySeed + this.state.previousRandom,
                          a = new K(i).next(),
                          s = a % n + e.value;
                      this.state.PushEvaluationStack(new T(s)), this.state.previousRandom = a;
                      break
                  }
                  case A.CommandType.SeedRandom:
                      let S = r(this.state.PopEvaluationStack(), T);
                      if (null == S || S instanceof T == !1) return this.Error("Invalid value passed to SEED_RANDOM");
                      if (null === S.value) return d("minInt.value");
                      this.state.storySeed = S.value, this.state.previousRandom = 0, this.state.PushEvaluationStack(new R);
                      break;
                  case A.CommandType.VisitIndex:
                      let b = this.VisitCountForContainer(this.state.currentPointer.container) - 1;
                      this.state.PushEvaluationStack(new T(b));
                      break;
                  case A.CommandType.SequenceShuffleIndex:
                      let E = this.NextSequenceShuffleIndex();
                      this.state.PushEvaluationStack(new T(E));
                      break;
                  case A.CommandType.StartThread:
                      break;
                  case A.CommandType.Done:
                      this.state.callStack.canPopThread ? this.state.callStack.PopThread() : (this.state.didSafeExit = !0, this.state.currentPointer = k.Null);
                      break;
                  case A.CommandType.End:
                      this.state.ForceEnd();
                      break;
                  case A.CommandType.ListFromInt:
                      let N = r(this.state.PopEvaluationStack(), T),
                          P = s(this.state.PopEvaluationStack(), _);
                      if (null === N) throw new C("Passed non-integer when creating a list element from a numerical value.");
                      let I = null;
                      if (null === this.listDefinitions) return d("this.listDefinitions");
                      let F = this.listDefinitions.TryListGetDefinition(P.value, null);
                      if (!F.exists) throw new C("Failed to find LIST called " + P.value); {
                          if (null === N.value) return d("minInt.value");
                          let t = F.result.TryGetItemWithValue(N.value, f.Null);
                          t.exists && (I = new x(t.result, N.value))
                      }
                      null == I && (I = new x), this.state.PushEvaluationStack(I);
                      break;
                  case A.CommandType.ListRange:
                      let V = r(this.state.PopEvaluationStack(), y),
                          L = r(this.state.PopEvaluationStack(), y),
                          D = r(this.state.PopEvaluationStack(), x);
                      if (null === D || null === L || null === V) throw new C("Expected list, minimum and maximum for LIST_RANGE");
                      if (null === D.value) return d("targetList.value");
                      let M = D.value.ListWithSubRange(L.valueObject, V.valueObject);
                      this.state.PushEvaluationStack(new x(M));
                      break;
                  case A.CommandType.ListRandom: {
                      let t = this.state.PopEvaluationStack();
                      if (null === t) throw new C("Expected list for LIST_RANDOM");
                      let e = t.value,
                          n = null;
                      if (null === e) throw d("list");
                      if (0 == e.Count) n = new g;
                      else {
                          let t = this.state.storySeed + this.state.previousRandom,
                              i = new K(t).next(),
                              a = i % e.Count,
                              r = e.entries();
                          for (let t = 0; t <= a - 1; t++) r.next();
                          let s = r.next().value,
                              l = {
                                  Key: f.fromSerializedKey(s[0]),
                                  Value: s[1]
                              };
                          if (null === l.Key.originName) return d("randomItem.Key.originName");
                          (n = new g(l.Key.originName, this)).Add(l.Key, l.Value), this.state.previousRandom = i
                      }
                      this.state.PushEvaluationStack(new x(n));
                      break
                  }
                  default:
                      this.Error("unhandled ControlCommand: " + e)
              }
              return !0
          }
          if (t instanceof L) {
              let e = t,
                  n = this.state.PopEvaluationStack();
              return this.state.variablesState.Assign(e, n), !0
          }
          if (t instanceof V) {
              let e = t,
                  n = null;
              if (null != e.pathForCount) {
                  let t = e.containerForCount,
                      i = this.VisitCountForContainer(t);
                  n = new T(i)
              } else if (null == (n = this.state.variablesState.GetVariableWithName(e.name))) {
                  let t = this.state.variablesState.TryGetDefaultVariableValue(e.name);
                  null != t ? (this.Warning("Variable not found in save state: '" + e.name + "', but seems to have been newly created. Assigning value from latest ink's declaration: " + t), n = t, this.state.variablesState.SetGlobal(e.name, n)) : (this.Warning("Variable not found: '" + e.name + "'. Using default value of 0 (false). This can happen with temporary variables if the declaration hasn't yet been hit."), n = new T(0))
              }
              return this.state.PushEvaluationStack(n), !0
          }
          if (t instanceof D) {
              let e = t,
                  n = this.state.PopEvaluationStack(e.numberOfParameters),
                  i = e.Call(n);
              return this.state.PushEvaluationStack(i), !0
          }
          return !1
      }
      ChoosePathString(t, n = !0, i = []) {
          if (this.IfAsyncWeCant("call ChoosePathString right now"), n) this.ResetCallstack();
          else if (this.state.callStack.currentElement.type == a.Function) {
              let e = "",
                  n = this.state.callStack.currentElement.currentPointer.container;
              throw null != n && (e = "(" + n.path.toString() + ") "), new Error("Story was running a function " + e + "when you called ChoosePathString(" + t + ") - this is almost certainly not not what you want! Full stack trace: \n" + this.state.callStack.callStackTrace)
          }
          this.state.PassArgumentsToEvaluationStack(i), this.ChoosePath(new e(t))
      }
      IfAsyncWeCant(t) {
          if (this._asyncContinueActive) throw new Error("Can't " + t + ". Story is in the middle of a ContinueAsync(). Make more ContinueAsync() calls or a single Continue() call beforehand.")
      }
      ChoosePath(t, e = !0) {
          this.state.SetChosenPath(t, e), this.VisitChangedContainersDueToDivert()
      }
      ChooseChoiceIndex(t) {
          t = t;
          let e = this.currentChoices;
          this.Assert(t >= 0 && t < e.length, "choice out of range");
          let n = e[t];
          return null === n.threadAtGeneration ? d("choiceToChoose.threadAtGeneration") : null === n.targetPath ? d("choiceToChoose.targetPath") : (this.state.callStack.currentThread = n.threadAtGeneration, void this.ChoosePath(n.targetPath))
      }
      HasFunction(t) {
          try {
              return null != this.KnotContainerWithName(t)
          } catch (t) {
              return !1
          }
      }
      EvaluateFunction(t, e = [], n = !1) {
          if (this.IfAsyncWeCant("evaluate a function"), null == t) throw new Error("Function is null");
          if ("" == t || "" == t.trim()) throw new Error("Function is empty or white space.");
          let i = this.KnotContainerWithName(t);
          if (null == i) throw new Error("Function doesn't exist: '" + t + "'");
          let a = [];
          a.push.apply(a, this.state.outputStream), this._state.ResetOutput(), this.state.StartFunctionEvaluationFromGame(i, e);
          let r = new m;
          for (; this.canContinue;) r.Append(this.Continue());
          let s = r.toString();
          this._state.ResetOutput(a);
          let l = this.state.CompleteFunctionEvaluationFromGame();
          return n ? {
              returned: l,
              output: s
          } : l
      }
      EvaluateExpression(t) {
          let e = this.state.callStack.elements.length;
          this.state.callStack.Push(a.Tunnel), this._temporaryEvaluationContainer = t, this.state.GoToStart();
          let n = this.state.evaluationStack.length;
          return this.Continue(), this._temporaryEvaluationContainer = null, this.state.callStack.elements.length > e && this.state.PopCallStack(), this.state.evaluationStack.length > n ? this.state.PopEvaluationStack() : null
      }
      CallExternalFunction(t, e) {
          if (null === t) return d("funcName");
          let n = this._externals.get(t),
              i = null;
          if (!(void 0 !== n)) {
              if (this.allowExternalFunctionFallbacks) return i = this.KnotContainerWithName(t), this.Assert(null !== i, "Trying to call EXTERNAL function '" + t + "' which has not been bound, and fallback ink function could not be found."), this.state.callStack.Push(a.Function, void 0, this.state.outputStream.length), void(this.state.divertedPointer = k.StartOf(i));
              this.Assert(!1, "Trying to call EXTERNAL function '" + t + "' which has not been bound (and ink fallbacks disabled).")
          }
          let r = [];
          for (let t = 0; t < e; ++t) {
              let t = s(this.state.PopEvaluationStack(), y).valueObject;
              r.push(t)
          }
          r.reverse();
          let l = n(r),
              o = null;
          null != l ? (o = y.Create(l), this.Assert(null !== o, "Could not create ink value from returned object of type " + typeof l)) : o = new R, this.state.PushEvaluationStack(o)
      }
      BindExternalFunctionGeneral(t, e) {
          this.IfAsyncWeCant("bind an external function"), this.Assert(!this._externals.has(t), "Function '" + t + "' has already been bound."), this._externals.set(t, e)
      }
      TryCoerce(t) {
          return t
      }
      BindExternalFunction(t, e) {
          this.Assert(null != e, "Can't bind a null function"), this.BindExternalFunctionGeneral(t, t => {
              this.Assert(t.length >= e.length, "External function expected " + e.length + " arguments");
              let n = [];
              for (let e = 0, i = t.length; e < i; e++) n[e] = this.TryCoerce(t[e]);
              return e.apply(null, n)
          })
      }
      UnbindExternalFunction(t) {
          this.IfAsyncWeCant("unbind an external a function"), this.Assert(this._externals.has(t), "Function '" + t + "' has not been bound."), this._externals.delete(t)
      }
      ValidateExternalBindings() {
          let t = null,
              e = null,
              n = arguments[1] || new Set;
          if (arguments[0] instanceof O && (t = arguments[0]), arguments[0] instanceof p && (e = arguments[0]), null === t && null === e)
              if (this.ValidateExternalBindings(this._mainContentContainer, n), this._hasValidatedExternals = !0, 0 == n.size) this._hasValidatedExternals = !0;
              else {
                  let t = "Error: Missing function binding for external";
                  t += n.size > 1 ? "s" : "", t += ": '", t += Array.from(n).join("', '"), t += "' ", t += this.allowExternalFunctionFallbacks ? ", and no fallback ink function found." : " (ink fallbacks disabled)", this.Error(t)
              }
          else if (null != t) {
              for (let e of t.content) {
                  let t = e;
                  null != t && t.hasValidName || this.ValidateExternalBindings(e, n)
              }
              for (let [e, i] of t.namedContent) this.ValidateExternalBindings(r(i, p), n)
          } else if (null != e) {
              let t = r(e, I);
              if (t && t.isExternal) {
                  let e = t.targetPathString;
                  if (null === e) return d("name");
                  if (!this._externals.has(e))
                      if (this.allowExternalFunctionFallbacks) {
                          this.mainContentContainer.namedContent.has(e) || n.add(e)
                      } else n.add(e)
              }
          }
      }
      ObserveVariable(t, e) {
          if (this.IfAsyncWeCant("observe a new variable"), null === this._variableObservers && (this._variableObservers = new Map), !this.state.variablesState.GlobalVariableExistsWithName(t)) throw new C("Cannot observe variable '" + t + "' because it wasn't declared in the ink story.");
          this._variableObservers.has(t) ? this._variableObservers.get(t).push(e) : this._variableObservers.set(t, [e])
      }
      ObserveVariables(t, e) {
          for (let n = 0, i = t.length; n < i; n++) this.ObserveVariable(t[n], e[n])
      }
      RemoveVariableObserver(t, e) {
          if (this.IfAsyncWeCant("remove a variable observer"), null !== this._variableObservers)
              if (void 0 !== e) {
                  if (this._variableObservers.has(e)) {
                      let n = this._variableObservers.get(e);
                      n.splice(n.indexOf(t), 1)
                  }
              } else {
                  let e = this._variableObservers.keys();
                  for (let n of e) {
                      let e = this._variableObservers.get(n);
                      e.splice(e.indexOf(t), 1)
                  }
              }
      }
      VariableStateDidChangeEvent(t, e) {
          if (null === this._variableObservers) return;
          let n = this._variableObservers.get(t);
          if (void 0 !== n) {
              if (!(e instanceof y)) throw new Error("Tried to get the value of a variable that isn't a standard type");
              let i = s(e, y);
              for (let e of n) e(t, i.valueObject)
          }
      }
      get globalTags() {
          return this.TagsAtStartOfFlowContainerWithPathString("")
      }
      TagsForContentAtPath(t) {
          return this.TagsAtStartOfFlowContainerWithPathString(t)
      }
      TagsAtStartOfFlowContainerWithPathString(t) {
          let n = new e(t),
              i = this.ContentAtPath(n).container;
          if (null === i) return d("flowContainer");
          for (;;) {
              let t = i.content[0];
              if (!(t instanceof O)) break;
              i = t
          }
          let a = null;
          for (let t of i.content) {
              let e = r(t, M);
              if (!e) break;
              null == a && (a = []), a.push(e.text)
          }
          return a
      }
      BuildStringOfHierarchy() {
          let t = new m;
          return this.mainContentContainer.BuildStringOfHierarchy(t, 0, this.state.currentPointer.Resolve()), t.toString()
      }
      BuildStringOfContainer(t) {
          let e = new m;
          return t.BuildStringOfHierarchy(e, 0, this.state.currentPointer.Resolve()), e.toString()
      }
      NextContent() {
          if (this.state.previousPointer = this.state.currentPointer.copy(), !this.state.divertedPointer.isNull && (this.state.currentPointer = this.state.divertedPointer.copy(), this.state.divertedPointer = k.Null, this.VisitChangedContainersDueToDivert(), !this.state.currentPointer.isNull)) return;
          if (!this.IncrementContentPointer()) {
              let t = !1;
              this.state.callStack.CanPop(a.Function) ? (this.state.PopCallStack(a.Function), this.state.inExpressionEvaluation && this.state.PushEvaluationStack(new R), t = !0) : this.state.callStack.canPopThread ? (this.state.callStack.PopThread(), t = !0) : this.state.TryExitFunctionEvaluationFromGame(), t && !this.state.currentPointer.isNull && this.NextContent()
          }
      }
      IncrementContentPointer() {
          let t = !0,
              e = this.state.callStack.currentElement.currentPointer.copy();
          if (e.index++, null === e.container) return d("pointer.container");
          for (; e.index >= e.container.content.length;) {
              t = !1;
              let n = r(e.container.parent, O);
              if (n instanceof O == !1) break;
              let i = n.content.indexOf(e.container);
              if (-1 == i) break;
              if ((e = new k(n, i)).index++, t = !0, null === e.container) return d("pointer.container")
          }
          return t || (e = k.Null), this.state.callStack.currentElement.currentPointer = e.copy(), t
      }
      TryFollowDefaultInvisibleChoice() {
          let t = this._state.currentChoices,
              e = t.filter(t => t.isInvisibleDefault);
          if (0 == e.length || t.length > e.length) return !1;
          let n = e[0];
          return null === n.targetPath ? d("choice.targetPath") : null === n.threadAtGeneration ? d("choice.threadAtGeneration") : (this.state.callStack.currentThread = n.threadAtGeneration, this.ChoosePath(n.targetPath, !1), !0)
      }
      VisitCountForContainer(t) {
          if (null === t) return d("container");
          if (!t.visitsShouldBeCounted) return console.warn("Read count for target (" + t.name + " - on " + t.debugMetadata + ") unknown. The story may need to be compiled with countAllVisits flag (-c)."), 0;
          let e = 0,
              n = t.path.toString();
          return e = this.state.visitCounts.get(n) || e
      }
      IncrementVisitCountForContainer(t) {
          let e = 0,
              n = t.path.toString();
          this.state.visitCounts.has(n) && (e = this.state.visitCounts.get(n)), e++, this.state.visitCounts.set(n, e)
      }
      RecordTurnIndexVisitToContainer(t) {
          let e = t.path.toString();
          this.state.turnIndices.set(e, this.state.currentTurnIndex)
      }
      TurnsSinceForContainer(t) {
          t.turnIndexShouldBeCounted || this.Error("TURNS_SINCE() for target (" + t.name + " - on " + t.debugMetadata + ") unknown. The story may need to be compiled with countAllVisits flag (-c).");
          let e = t.path.toString(),
              n = this.state.turnIndices.get(e);
          return void 0 !== n ? this.state.currentTurnIndex - n : -1
      }
      NextSequenceShuffleIndex() {
          let t = r(this.state.PopEvaluationStack(), T);
          if (!(t instanceof T)) return this.Error("expected number of elements in sequence for shuffle index"), 0;
          let e = this.state.currentPointer.container;
          if (null === e) return d("seqContainer");
          if (null === t.value) return d("numElementsIntVal.value");
          let n = t.value,
              i = s(this.state.PopEvaluationStack(), T).value;
          if (null === i) return d("seqCount");
          let a = i / n,
              l = i % n,
              o = e.path.toString(),
              u = 0;
          for (let t = 0, e = o.length; t < e; t++) u += o.charCodeAt(t) || 0;
          let h = u + a + this.state.storySeed,
              c = new K(Math.floor(h)),
              p = [];
          for (let t = 0; t < n; ++t) p.push(t);
          for (let t = 0; t <= l; ++t) {
              let e = c.next() % p.length,
                  n = p[e];
              if (p.splice(e, 1), t == l) return n
          }
          throw new Error("Should never reach here")
      }
      Error(t, e = !1) {
          let n = new C(t);
          throw n.useEndLineNumber = e, n
      }
      Warning(t) {
          this.AddError(t, !0)
      }
      AddError(t, e = !1, n = !1) {
          let i = this.currentDebugMetadata,
              a = e ? "WARNING" : "ERROR";
          if (null != i) {
              let e = n ? i.endLineNumber : i.startLineNumber;
              t = "RUNTIME " + a + ": '" + i.fileName + "' line " + e + ": " + t
          } else t = this.state.currentPointer.isNull ? "RUNTIME " + a + ": " + t : "RUNTIME " + a + ": (" + this.state.currentPointer + "): " + t;
          this.state.AddError(t, e), e || this.state.ForceEnd()
      }
      Assert(t, e = null) {
          if (0 == t) throw null == e && (e = "Story assert"), new Error(e + " " + this.currentDebugMetadata)
      }
      get currentDebugMetadata() {
          let t, e = this.state.currentPointer;
          if (!e.isNull && null !== e.Resolve() && null !== (t = e.Resolve().debugMetadata)) return t;
          for (let n = this.state.callStack.elements.length - 1; n >= 0; --n)
              if (!(e = this.state.callStack.elements[n].currentPointer).isNull && null !== e.Resolve() && null !== (t = e.Resolve().debugMetadata)) return t;
          for (let e = this.state.outputStream.length - 1; e >= 0; --e) {
              if (null !== (t = this.state.outputStream[e].debugMetadata)) return t
          }
          return null
      }
      get mainContentContainer() {
          return this._temporaryEvaluationContainer ? this._temporaryEvaluationContainer : this._mainContentContainer
      }
  }! function(t) {
      let e;
      ! function(t) {
          t[t.NoChange = 0] = "NoChange", t[t.ExtendedBeyondNewline = 1] = "ExtendedBeyondNewline", t[t.NewlineRemoved = 2] = "NewlineRemoved"
      }(e = t.OutputStateChange || (t.OutputStateChange = {}))
  }(H || (H = {})), t.Story = H, t.InkList = g, Object.defineProperty(t, "__esModule", {
      value: !0
  })
});
