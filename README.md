#  Full-Stack Chat Application – CI/CD & GitOps on Kubernetes (Docker Compose, KIND & AWS EKS)

## Project Overview

This project demonstrates an end-to-end DevOps workflow for deploying a full-stack chat application, starting from local development using Docker Compose, moving to Kubernetes (KIND), and finally deploying to AWS EKS using Terraform.

The solution integrates Jenkins for CI, Docker for containerization, and Argo CD for GitOps-based Continuous Deployment, following real-world cloud-native best practices.

---

##  Architecture Evolution

```
Local Development
Docker Compose
        ↓
Kubernetes (KIND)
        ↓
AWS EKS (Terraform)
        ↓
Jenkins (CI) → Docker Hub
        ↓
Argo CD (GitOps CD)
        ↓
NGINX Ingress → Application
```

---

## Application Components

| Component           | Technology               |
| ------------------- | ------------------------ |
| Frontend            | React, NGINX             |
| Backend             | Node.js, Express         |
| Database            | MongoDB                  |
| Local Orchestration | Docker Compose           |
| CI                  | Jenkins                  |
| CD                  | Argo CD (GitOps)         |
| Containerization    | Docker                   |
| Orchestration       | Kubernetes (KIND & EKS)  |
| Infrastructure      | Terraform                |
| Networking          | NGINX Ingress Controller |

---

## 🛠️ Technologies Used

```
Docker & Docker Compose
Kubernetes (KIND, AWS EKS)
Terraform (IaC)
Jenkins (CI)
Argo CD (GitOps CD)
NGINX Ingress Controller
MongoDB (PV/PVC)
AWS (EKS, EC2, VPC, IAM)
Git & GitHub
Linux, Shell Scripting
React, Node.js
```



##  Repository Structure

```
.
├── backend/
│   ├── Dockerfile
│   └── src/
├── frontend/
│   ├── Dockerfile
│   └── src/
├── docker-compose.yml
├── k8s/
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── mongo-deployment.yaml
│   ├── services/
│   ├── ingress.yaml
│   └── namespace.yaml
├── terraform/
│   ├── vpc.tf
│   ├── eks.tf
│   └── main.tf
├── argocd/
│   └── chatapp-app.yaml
├── Jenkinsfile
└── README.md
```

---

## Local Development with Docker Compose

For local development and testing, the application can be run using Docker Compose.

### Docker Compose Services

* Frontend (React + NGINX)
* Backend (Node.js + Express)
* MongoDB

### Run Locally

```bash
docker-compose up -d
```

Access application:

```
http://localhost:8080
```

This setup was used as the base reference before migrating to Kubernetes.



## Kubernetes Deployment (KIND & EKS)

* Same Kubernetes manifests are reused across environments
* MongoDB uses Persistent Volumes (PV) & Persistent Volume Claims (PVC)
* Application exposed via ClusterIP services
* Traffic routed using NGINX Ingress Controller

---

## AWS EKS Infrastructure (Terraform)

AWS EKS cluster is provisioned using Terraform, including:

* VPC with public & private subnets
* EKS control plane and managed node groups
* Security groups and IAM roles
* Load balancer integration

### Terraform Commands

```
terraform init
terraform plan
terraform apply
```



## CI/CD Pipeline (Jenkins → Argo CD)

### Jenkins (CI)

* Checkout source code
* Build Docker images
* Tag images with build numbers
* Push images to Docker Hub
* Update Kubernetes manifests
* Commit & push changes to GitHub

### Argo CD (CD – GitOps)

* Watches Git repository
* Automatically syncs changes to Kubernetes
* Self-healing and pruning enabled



##  CI/CD Flow

```
Git Commit
 → Jenkins Build
 → Docker Image Push
 → Update K8s YAML
 → Git Push
 → Argo CD Auto Sync
 → Deployment to KIND / EKS
```

---

##  Application Access

Using Ingress:

```
kubectl port-forward -n ingress-nginx svc/ingress-nginx-controller 8080:80
```

Browser:

```
http://localhost:8080
```

---

##  Health Check

Backend health endpoint:

```http
GET /health
```

Used for:

* Kubernetes readiness probes
* Load balancer health checks
* Debugging deployments

---

##  Key Learnings

* Docker Compose → Kubernetes migration
* GitOps-based deployments using Argo CD
* Infrastructure provisioning with Terraform
* Jenkins CI automation
* Kubernetes networking & ingress debugging
* EKS load balancer & security group troubleshooting

---

## Best Practices Followed

* Infrastructure as Code (Terraform)
* GitOps Continuous Deployment
* Immutable Docker images
* Environment parity (Local → KIND → EKS)
* Clear CI/CD separation

---

##  Future Enhancements

* HTTPS with cert-manager
* Monitoring with Prometheus & Grafana
* Security scanning (Trivy, SonarQube)
* Blue-Green / Canary deployments

---

##  Author

Jyothi Kumar Reddy
DevOps Engineer | Kubernetes | AWS | Terraform | Jenkins | GitOps

---
