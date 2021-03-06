import { Link } from 'react-router-dom';
import { ListItemList } from '../components/book-list';

export default function ReadingListScreen() {
  return (
    <ListItemList
      filterListItems={(li) => li.filter((i) => i.status === 'READING')}
      noListItems={
        <p>
          Hey there! Welcome to your bookshelf reading list. Get started by
          heading over to <Link to="/discover">the Discover page</Link> to add
          books to your list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've finished all your books! Check them out in your{' '}
          <Link to="/finished">finished books</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  );
}
