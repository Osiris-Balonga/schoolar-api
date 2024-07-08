class Populate {
  //feature/pay
  example() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  partner() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "application",
        select: "",
      },
    ];
  }
  typeTemplate() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  accessUser() {
    return [
      {
        path: "user",
        select: "",
      },
      {
        path: "permission",
        select: "",
        populate: this.permissionUser(),
      },
      {
        path: "story",
        populate: this.story(),
      },
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  groupAccessUser() {
    return [
      {
        path: "users",
        populate: this.user(),
      },
      {
        path: "permissions",
        select: "",
        populate: this.permissionUser(),
      },
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  //feature/pay
  permissionUser() {
    return [
      {
        path: "action",
        select: "",
      },
      {
        path: "application",
        select: "",
      },
      {
        path: "module",
        select: "",
      },
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }
  action() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  external() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  employee() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  absence() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  contract() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.employee(),
      },
    ];
  }

  department() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },

      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  deposit() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  holiday() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  indemnity() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  maritalStatus() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  paySlip() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  paymentMode() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  premium() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  presence() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  ready() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  salary() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "paySlip",
        populate: this.paySlip(),
      },
      {
        path: "paymentMode",
        populate: this.paymentMode(),
      },
      {
        path: "department",
        populate: this.department(),
      },
    ];
  }

  vacation() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  menu() {
    return [
      {
        path: "application",
      },
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  menuTranslation() {
    return [
      {
        path: "application",
      },
      {
        path: "menu",
      },
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  section() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  template() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  multimedia() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  contact() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  siteSetting() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },
      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  //features/features-base

  folder() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  group() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  customer() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  package() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  permission() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  session() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  ticket() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  customerType() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  packageModule() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  permissionAccess() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  replyTicket() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  ticketType() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  userType() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  //features-main

  support() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },

      {
        path: "person",
        select: "",
      },
    ];
  }

  notification() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  person(params = []) {
    return [
      {
        path: "address",
        populate: this.address(),
      },
      {
        path: "createdBy",
      },
    ];
  }

  user() {
    return [
      {
        path: "person",
        populate: this.person(),
      },
      {
        path: "createdBy",
        populate: {
          path: "person",
        },
      },
    ];
  }

  story() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "employees",
        populate: this.employee(),
      },
      {
        path: "user",
      },
      /* {
                path: "country",
                select: ""
            },*/
    ];
  }

  socialAdvantage() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
      {
        path: "employees",
        populate: this.employee(),
      },
    ];
  }

  city() {
    return [
      {
        path: "country",
        select: "",
      },
      {
        path: "createdBy",
      },
    ];
  }

  country() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  socialNetworks() {
    return [
      {
        path: "createdBy",
        populate: this.user(),
      },
      {
        path: "updatedBy",
        populate: this.user(),
      },

      {
        path: "deletedBy",
        populate: this.user(),
      },
    ];
  }

  language() {
    return [
      {
        path: "language",
      },
    ];
  }

  category() {
    return [
      {
        path: "category",
      },
    ];
  }

  address(params = []) {
    return [
      {
        path: "city",
        populate: new Populate().city(),
      },
      {
        path: "country",
        select: "",
      },
      {
        path: "person",
      },
      {
        path: "createdBy",
      },
    ];
  }

  formation(params = []) {
    const p = [
      {
        path: "domain",
        //populate: new Populate().domain()
      },
      {
        path: "formationType",
        //populate: new Populate().formationType()
      },
    ];
    return p.filter((el) => !params.includes(el.path));
  }

  institutType(params = []) {
    const p = [
      {
        path: "institut",
        //populate: new Populate().formationType()
      },
    ];
    return p.filter((el) => !params.includes(el.path));
  }
}

module.exports = Populate;
