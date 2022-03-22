export const categoryMenu = [
  {
    title: 'Category Color',
    icon: 'mdi-pencil',
    click: () => {
      this.dialogs.editColor = true;
    }
  },
  {
    title: 'Category Title',
    icon: 'mdi-pencil',
    click: () => {
      this.dialogs.editTitle = true;
    }
  },
  {
    title: 'Category Icon',
    icon: 'mdi-pencil',
    click: () => {
      this.dialogs.editIcon = true;
    }
  },
  {
    title: 'Delete',
    icon: 'mdi-delete',
    click: () => {
      this.dialogs.delete = true;
    }
  },
]
