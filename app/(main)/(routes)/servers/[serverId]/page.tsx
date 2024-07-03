const ServerIdPage = ({ params }: { params: { serverId: string } }) => {
  return (
    <div>
      Server Id
      {params.serverId}
    </div>
  );
};

export default ServerIdPage;
