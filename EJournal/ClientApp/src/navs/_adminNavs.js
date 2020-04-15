export default {
    items: [
      {
        title: true,
        name: 'Управління учнями',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути список',
        url: '/admin/students',
        icon: 'icon-drop',
      },
      {
        name: 'Реєстрація учня',
        url: '/admin/addstudent',
        icon: 'icon-drop',
      },
      {
        title: true,
        name: 'Управління вчителями',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути список',
        url: '/admin/teachers',
        icon: 'icon-drop',
        // children: [
        //   {
        //     name: 'Викладачі',
        //     url: '/base/breadcrumbs',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Куратори',
        //     url: '/base/cards',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. відділенням',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   } 
        // ],
      },
      {
        name: 'Реєстрація вчителя',
        url: '/admin/addteacher',
        icon: 'icon-drop',
        // children: [
        //   {
        //     name: 'Викладач',
        //     url: '/base/breadcrumbs',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Куратор',
        //     url: '/base/cards',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. відділенням',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Голова цикл. комісії',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   },
        //   {
        //     name: 'Зав. навч. кабінетом',
        //     url: '/base/carousels',
        //     icon: 'icon-puzzle',
        //   }
          
        // ],
      },
      {
        title: true,
        name: 'Результативність',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Переглянути оцінки',
        url: '/admin/marks',
        icon: 'icon-drop',
      },
      {
        title: true,
        name: 'Розклад уроків',
        wrapper: {            // optional wrapper object
          element: '',        // required valid HTML5 element tag
          attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
        },
        class: ''             // optional class names space delimited list for title item ex: "text-center"
      },
      {
        name: 'Редагувати розклад',
        url: '',
        icon: 'icon-drop',
        badge: {
          variant: 'info',
          text: 'NEW',
        },
      },
    
    ],
  };
  