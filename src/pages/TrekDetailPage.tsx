import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { treks } from "@/data/siteData";
import TrekInternalPage from "@/pages/TrekInternalPage";

const TrekDetailPage = () => {
  const { id } = useParams();
  const trek = treks.find((item) => item.id === id);

  if (!trek) {
    return (
      <Layout>
        <div className="flex min-h-[60vh] items-center justify-center px-4 text-center">
          <div>
            <h1 className="font-heading text-3xl font-black">Event Not Found</h1>
            <Link to="/treks"><Button className="mt-4">Browse Events</Button></Link>
          </div>
        </div>
      </Layout>
    );
  }

  return <TrekInternalPage key={trek.id} trek={trek} />;
};

export default TrekDetailPage;
