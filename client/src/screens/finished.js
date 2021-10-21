import { Link } from 'react-router-dom';
import { ListItemList } from '../components/book-list';

export default function FinishedScreen() {
  return (
    <ListItemList
      filterListItems={(li) => li.filter((i) => i.status === 'FINISHED')}
      noListItems={
        <p>
          Hey there! This is where books will go when you've finished reading
          them. Get started by heading over to{' '}
          <Link to="/discover">the Discover page</Link> to add books to your
          list.
        </p>
      }
      noFilteredListItems={
        <p>
          Looks like you've got some reading to do! Check them out in your{' '}
          <Link to="/list">reading list</Link> or{' '}
          <Link to="/discover">discover more</Link>.
        </p>
      }
    />
  );
}
