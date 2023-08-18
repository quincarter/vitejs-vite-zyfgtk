import { Keys, MenuActions } from './keys.constants';

export const filterOptions = (
  options: string[] = [],
  filter: string,
  exclude: string[] = []
) =>
  options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });

export const findMatches = (options: string[], search: any) => {
  const names = search.split(',');
  return names
    .map((name: any) => {
      const match = options.filter(
        (option) => name.trim().toLowerCase() === option.toLowerCase()
      );
      return match.length > 0 ? match[0] : null;
    })
    .filter((option: any) => option !== null);
};

export const getActionFromKey = (key: any, menuOpen: boolean) => {
  // handle opening when closed
  if (!menuOpen && key === Keys.Down) {
    return MenuActions.Open;
  }

  // handle keys when open
  if (key === Keys.Down) {
    return MenuActions.Next;
  } else if (key === Keys.Up) {
    return MenuActions.Previous;
  } else if (key === Keys.Home) {
    return MenuActions.First;
  } else if (key === Keys.End) {
    return MenuActions.Last;
  } else if (key === Keys.Escape) {
    return MenuActions.Close;
  } else if (key === Keys.Enter) {
    return MenuActions.CloseSelect;
  } else if (key === Keys.Backspace || key === Keys.Clear || key.length === 1) {
    return MenuActions.Type;
  }
};

export const getIndexByLetter = (options: string[], filter: string) => {
  const firstMatch = filterOptions(options, filter)[0];
  return firstMatch ? options.indexOf(firstMatch) : -1;
};

export const getUpdatedIndex = (current: number, max: number, action: any) => {
  switch (action) {
    case MenuActions.First:
      return 0;
    case MenuActions.Last:
      return max;
    case MenuActions.Previous:
      return Math.max(0, current - 1);
    case MenuActions.Next:
      return Math.min(max, current + 1);
    default:
      return current;
  }
};

export const isScrollable = (element: HTMLElement) => {
  return element && element.clientHeight < element.scrollHeight;
};

export const maintainScrollVisibility = (
  activeElement: HTMLElement,
  scrollParent: HTMLElement
) => {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
};
