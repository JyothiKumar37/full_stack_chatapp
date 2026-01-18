module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 19.21.0"

  cluster_name    = "chatapp-eks"
  cluster_version = "1.29"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  cluster_endpoint_public_access  = true
cluster_endpoint_private_access = true


  enable_irsa = true

  eks_managed_node_group_defaults = {
    instance_types = ["t2.medium"]  
  }

  eks_managed_node_groups = {
    tws-demo-ng = {
      min_size     = 2
      max_size     = 3
      desired_size = 2
    }
  }

  tags = {
    Environment = "dev"
    Project     = "chatapp"
  }
}

